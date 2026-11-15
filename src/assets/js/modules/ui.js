/**
 * src/assets/js/modules/ui.js
 * Header animations and background visual effects
 */

export function initHeaderScroll() {
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    }
  });
}

export function initAquaBubbles() {
  // Bubble background effect removed for cleaner aesthetic
}
