/**
 * src/assets/js/modules/auth.js
 * Firebase authentication client module
 */

import { auth } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AUTH_STORAGE_KEY = "minhaq_user";

export function toStoredFirebaseUser(user) {
  return user
    ? {
        id: user.uid,
        uid: user.uid,
        email: user.email,
        role: "customer",
        provider: "firebase",
      }
    : null;
}

export function storeAuthUser(storedUser) {
  if (storedUser) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(storedUser));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  updateAuthButtons(storedUser);
}

export function cacheAuthUser(user) {
  storeAuthUser(toStoredFirebaseUser(user));
}

export function updateAuthButtons(user) {
  const loginBtns = document.querySelectorAll(".btn-login");
  loginBtns.forEach((btn) => {
    if (user) {
      btn.innerHTML = `<i class="fa-solid fa-user"></i> ${user.email.split("@")[0]}`;
      btn.dataset.authAction = "logout";
    } else {
      btn.innerHTML = "Đăng nhập";
      btn.dataset.authAction = "login";
    }
  });
}

export async function syncFirebaseUserWithBackend(firebaseUser) {
  if (!firebaseUser) return null;

  try {
    const idToken = await firebaseUser.getIdToken();
    const response = await fetch("/api/auth/firebase", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.success !== false) {
      return {
        ...data.user,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        provider: "firebase",
      };
    }
  } catch (error) {
    // Non-blocking sync error
  }

  return {
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    role: "customer",
    provider: "firebase",
  };
}

export async function cacheFirebaseUser(firebaseUser) {
  const fallbackUser = toStoredFirebaseUser(firebaseUser);
  storeAuthUser(fallbackUser);

  try {
    const syncedUser = await syncFirebaseUserWithBackend(firebaseUser);
    if (syncedUser) {
      storeAuthUser(syncedUser);
      return syncedUser;
    }
  } catch {}

  return fallbackUser;
}

export function getFirebaseAuthMessage(error, loginMode) {
  const code = error?.code || "";
  const messages = {
    "auth/email-already-in-use": "Email này đã được đăng ký. Bạn hãy chuyển sang đăng nhập.",
    "auth/invalid-email": "Email không hợp lệ.",
    "auth/invalid-credential": "Email hoặc mật khẩu không đúng.",
    "auth/user-not-found": "Không tìm thấy tài khoản với email này.",
    "auth/wrong-password": "Mật khẩu không đúng.",
    "auth/weak-password": "Mật khẩu cần ít nhất 6 ký tự.",
    "auth/network-request-failed": "Không kết nối được Firebase. Vui lòng kiểm tra mạng rồi thử lại.",
    "auth/missing-password": "Vui lòng nhập mật khẩu.",
    "auth/too-many-requests": "Bạn thao tác quá nhiều lần. Vui lòng thử lại sau ít phút.",
  };

  return (
    messages[code] ||
    `Không thể ${loginMode ? "đăng nhập" : "đăng ký"} lúc này. Mã lỗi Firebase: ${code || "unknown"}.`
  );
}

export function initAuth() {
  const authForm = document.getElementById("auth-form");
  const authToggleLink = document.getElementById("auth-toggle-link");
  const authTitle = document.getElementById("auth-title");
  const authSubtitle = document.getElementById("auth-subtitle");
  const authSubmitBtn = document.getElementById("auth-submit-btn");
  const authToggleText = document.getElementById("auth-toggle-text");
  const authRememberRow = document.getElementById("auth-remember-row");

  let isLoginMode = true;

  function setAuthLoading(isLoading) {
    if (!authSubmitBtn) return;
    authSubmitBtn.disabled = isLoading;
    authSubmitBtn.textContent = isLoading
      ? isLoginMode
        ? "Đang đăng nhập..."
        : "Đang đăng ký..."
      : isLoginMode
      ? "Đăng nhập ngay"
      : "Đăng ký tài khoản";
  }

  if (authToggleLink) {
    authToggleLink.addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      authTitle.textContent = isLoginMode ? "Đăng nhập" : "Đăng ký";
      authSubtitle.textContent = isLoginMode
        ? "Đăng nhập để theo dõi đơn hàng và tích điểm"
        : "Tạo tài khoản mới để hưởng ưu đãi thành viên";
      authSubmitBtn.textContent = isLoginMode
        ? "Đăng nhập ngay"
        : "Đăng ký tài khoản";
      authToggleText.textContent = isLoginMode
        ? "Chưa có tài khoản?"
        : "Đã có tài khoản?";
      authToggleLink.textContent = isLoginMode
        ? "Đăng ký ngay"
        : "Đăng nhập ngay";
      if (authRememberRow) {
        authRememberRow.style.display = isLoginMode ? "flex" : "none";
      }
    });
  }

  if (authForm) {
    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("auth-email").value.trim();
      const password = document.getElementById("auth-password").value;

      if (!email || !password) {
        alert("Vui lòng nhập email và mật khẩu.");
        return;
      }

      setAuthLoading(true);

      try {
        const credential = isLoginMode
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);

        await cacheFirebaseUser(credential.user);
        alert(isLoginMode ? "Đăng nhập thành công!" : "Đăng ký thành công!");
        window.location.href = "index.html";
      } catch (firebaseError) {
        console.error(firebaseError);
        alert(getFirebaseAuthMessage(firebaseError, isLoginMode));
      } finally {
        setAuthLoading(false);
      }
    });
  }

  window.logoutCurrentUser = async function () {
    try {
      await signOut(auth);
    } finally {
      cacheAuthUser(null);
    }
  };

  document.querySelectorAll(".btn-login").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.authAction || "login";
      if (action === "logout") {
        if (confirm("Bạn muốn đăng xuất?")) {
          signOut(auth);
        }
        return;
      }
      window.location.href = "login.html";
    });
  });

  updateAuthButtons(null);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      cacheAuthUser(null);
      return;
    }
    cacheFirebaseUser(user);
  });
}
