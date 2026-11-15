/**
 * scripts/benchmark_runner.js
 * Automated Benchmark & Performance Scoreboard Generator
 * Usage: node scripts/benchmark_runner.js [--baseline | --compare]
 */
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");
const autocannon = require("autocannon");

const PROJECT_ROOT = path.join(__dirname, "..");
const BENCHMARK_DIR = path.join(PROJECT_ROOT, "benchmarks");
const BASELINE_FILE = path.join(BENCHMARK_DIR, "baseline.json");
const POST_OPT_FILE = path.join(BENCHMARK_DIR, "post_optimization.json");
const REPORT_FILE = path.join(BENCHMARK_DIR, "comparison.md");
const SERVER_URL = "http://127.0.0.1:3000";

function isServerRunning(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function ensureServerRunning() {
  const ready = await isServerRunning(`${SERVER_URL}/api/products`);
  if (ready) {
    console.log(`[benchmark] Server already running at ${SERVER_URL}`);
    return null;
  }

  console.log(`[benchmark] Starting server at ${SERVER_URL}...`);
  const serverProcess = spawn(
    process.execPath,
    [path.join(PROJECT_ROOT, "server", "server.js")],
    {
      cwd: PROJECT_ROOT,
      stdio: "pipe",
      env: { ...process.env, PORT: "3000" },
    }
  );

  let started = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    if (await isServerRunning(`${SERVER_URL}/api/products`)) {
      started = true;
      break;
    }
  }

  if (!started) {
    serverProcess.kill();
    throw new Error("Failed to start backend server for benchmarking.");
  }

  console.log("[benchmark] Server ready.");
  return serverProcess;
}

function runAutocannon(url, options = {}) {
  return new Promise((resolve, reject) => {
    const config = {
      url,
      duration: 10,
      connections: 25,
      ...options,
    };
    autocannon(config, (err, result) => {
      if (err) return reject(err);
      const latencyP95 =
        result.latency.p95 !== undefined
          ? result.latency.p95
          : result.latency.p97_5 !== undefined
          ? result.latency.p97_5
          : result.latency.average;

      resolve({
        requestsPerSec: Number((result.requests.average || 0).toFixed(1)),
        latencyAvgMs: Number((result.latency.average || 0).toFixed(2)),
        latencyP95Ms: Number(latencyP95.toFixed(2)),
        throughputMbSec: Number(
          ((result.throughput.average || 0) / (1024 * 1024)).toFixed(2)
        ),
        totalRequests: result.requests.total || 0,
        errors: result.errors || 0,
        non2xx: result.non2xx || 0,
      });
    });
  });
}

function getDirectoryStats(dirPath) {
  let totalBytes = 0;
  let fileCount = 0;
  if (!fs.existsSync(dirPath)) return { bytes: 0, mb: 0, count: 0 };

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile()) {
        totalBytes += fs.statSync(fullPath).size;
        fileCount++;
      }
    }
  }

  traverse(dirPath);
  return {
    bytes: totalBytes,
    mb: Number((totalBytes / (1024 * 1024)).toFixed(2)),
    count: fileCount,
  };
}

async function collectMetrics() {
  console.log("--> Measuring GET /api/products (10s, 25 connections)...");
  const productsBench = await runAutocannon(`${SERVER_URL}/api/products`, {
    connections: 25,
    duration: 10,
  });

  console.log("--> Measuring POST /api/chatbot (10s, 10 connections)...");
  const chatBench = await runAutocannon(`${SERVER_URL}/api/chatbot`, {
    connections: 10,
    duration: 10,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "tu van ca canh betta de nuoi" }),
  });

  console.log("--> Measuring static image asset payload...");
  const imagesStats = getDirectoryStats(
    path.join(PROJECT_ROOT, "src", "assets", "images")
  );

  const distDir = path.join(PROJECT_ROOT, "dist");
  if (!fs.existsSync(distDir)) {
    console.log("--> Building production bundle with vite...");
    execSync("npm run build", { cwd: PROJECT_ROOT, stdio: "inherit" });
  }

  console.log("--> Measuring production dist bundle payload...");
  const distStats = getDirectoryStats(distDir);

  return {
    timestamp: new Date().toISOString(),
    api: {
      products: productsBench,
      chatbot: chatBench,
    },
    payload: {
      imagesMb: imagesStats.mb,
      imagesBytes: imagesStats.bytes,
      imagesCount: imagesStats.count,
      distMb: distStats.mb,
      distBytes: distStats.bytes,
      distCount: distStats.count,
    },
  };
}

function generateScoreboard(baseline, current) {
  const formatDelta = (base, curr, lowerIsBetter = false) => {
    const diff = curr - base;
    const pct = base !== 0 ? ((diff / base) * 100).toFixed(1) : "0.0";
    const improved = lowerIsBetter ? diff < 0 : diff > 0;
    const isEquiv = Math.abs(diff) < 0.001;
    const status = isEquiv ? "EQUIVALENT" : improved ? "IMPROVED" : "REGRESSED";
    const sign = diff > 0 ? "+" : "";
    return {
      diff: `${sign}${diff.toFixed(2)}`,
      pct: `${sign}${pct}%`,
      status,
    };
  };

  const rows = [
    {
      metric: "Products API Throughput (req/sec)",
      base: baseline.api.products.requestsPerSec.toFixed(1),
      post: current.api.products.requestsPerSec.toFixed(1),
      ...formatDelta(
        baseline.api.products.requestsPerSec,
        current.api.products.requestsPerSec,
        false
      ),
    },
    {
      metric: "Products API Latency p95 (ms)",
      base: baseline.api.products.latencyP95Ms.toFixed(2),
      post: current.api.products.latencyP95Ms.toFixed(2),
      ...formatDelta(
        baseline.api.products.latencyP95Ms,
        current.api.products.latencyP95Ms,
        true
      ),
    },
    {
      metric: "Chatbot API Throughput (req/sec)",
      base: baseline.api.chatbot.requestsPerSec.toFixed(1),
      post: current.api.chatbot.requestsPerSec.toFixed(1),
      ...formatDelta(
        baseline.api.chatbot.requestsPerSec,
        current.api.chatbot.requestsPerSec,
        false
      ),
    },
    {
      metric: "Chatbot API Latency p95 (ms)",
      base: baseline.api.chatbot.latencyP95Ms.toFixed(2),
      post: current.api.chatbot.latencyP95Ms.toFixed(2),
      ...formatDelta(
        baseline.api.chatbot.latencyP95Ms,
        current.api.chatbot.latencyP95Ms,
        true
      ),
    },
    {
      metric: "Catalog Images Size (MB)",
      base: baseline.payload.imagesMb.toFixed(2),
      post: current.payload.imagesMb.toFixed(2),
      ...formatDelta(
        baseline.payload.imagesMb,
        current.payload.imagesMb,
        true
      ),
    },
    {
      metric: "Production Dist Size (MB)",
      base: baseline.payload.distMb.toFixed(2),
      post: current.payload.distMb.toFixed(2),
      ...formatDelta(baseline.payload.distMb, current.payload.distMb, true),
    },
  ];

  let md = "# 🚀 Performance Benchmark Scoreboard\n\n";
  md += `**Baseline Recorded**: ${baseline.timestamp}  \n`;
  md += `**Current Evaluation**: ${current.timestamp}  \n\n`;
  md += "| Metric | Baseline | Current | Delta (%) | Status |\n";
  md += "|:---|:---:|:---:|:---:|:---:|\n";
  for (const r of rows) {
    const icon =
      r.status === "IMPROVED" ? "✅" : r.status === "REGRESSED" ? "❌" : "➖";
    md += `| **${r.metric}** | ${r.base} | ${r.post} | ${r.pct} | ${icon} ${r.status} |\n`;
  }
  md += "\n";
  return md;
}

async function main() {
  if (!fs.existsSync(BENCHMARK_DIR)) {
    fs.mkdirSync(BENCHMARK_DIR, { recursive: true });
  }

  const isBaseline =
    process.argv.includes("--baseline") || !fs.existsSync(BASELINE_FILE);

  let serverProcess = null;
  try {
    serverProcess = await ensureServerRunning();

    console.log(
      `\n=== Starting Benchmark Run (${isBaseline ? "BASELINE" : "COMPARISON"}) ===\n`
    );
    const metrics = await collectMetrics();

    if (isBaseline) {
      fs.writeFileSync(BASELINE_FILE, JSON.stringify(metrics, null, 2));
      console.log(`\n✅ Baseline metrics successfully saved to:\n   ${BASELINE_FILE}\n`);
      console.log(JSON.stringify(metrics, null, 2));
    } else {
      fs.writeFileSync(POST_OPT_FILE, JSON.stringify(metrics, null, 2));
      console.log(`\n✅ Post-optimization metrics saved to:\n   ${POST_OPT_FILE}\n`);

      const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, "utf8"));
      const scoreboard = generateScoreboard(baseline, metrics);
      fs.writeFileSync(REPORT_FILE, scoreboard);
      console.log(scoreboard);
      console.log(`✅ Comparative scoreboard written to:\n   ${REPORT_FILE}`);
    }
  } finally {
    if (serverProcess) {
      console.log("[benchmark] Terminating spawned server...");
      serverProcess.kill();
    }
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Benchmark runner failed:", err);
    process.exit(1);
  });
}

module.exports = { collectMetrics, generateScoreboard };
