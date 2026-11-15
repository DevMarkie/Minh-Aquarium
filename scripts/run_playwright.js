const { spawn } = require("child_process");
const path = require("path");

const command = path.join(
  __dirname,
  "..",
  "node_modules",
  "playwright",
  "cli.js",
);
const args = ["test", ...process.argv.slice(2)];
const env = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key, value]) => value !== undefined && !key.startsWith("="),
  ),
);
if (!env.PLAYWRIGHT_START_WEBSERVER) {
  env.PLAYWRIGHT_START_WEBSERVER = "1";
}
if (!env.PLAYWRIGHT_BASE_URL) {
  env.PLAYWRIGHT_BASE_URL = "http://127.0.0.1:4173";
}

const child = spawn(process.execPath, [command, ...args], {
  stdio: "inherit",
  env: {
    ...env,
    PLAYWRIGHT_BROWSERS_PATH: process.env.PLAYWRIGHT_BROWSERS_PATH || "0",
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
