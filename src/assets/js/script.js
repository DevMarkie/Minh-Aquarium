/**
 * src/assets/js/script.js
 * Modular Application Orchestrator for Minh Aquarium
 * Integrates modular ES subsystems while guaranteeing 100% backward compatibility
 */

import { initHeaderScroll, initAquaBubbles } from "./modules/ui.js";
import {
  cart,
  updateCartBadge,
  initAddToCartButtons,
  initCartButtonNavigation,
  initCartPage,
  showCartModal,
  parsePrice,
  calculateCartSubtotal,
  computeShippingDetails,
  detectRegionFromAddress,
  formatVnd,
} from "./modules/cart.js";
import { initBannerCarousel } from "./modules/carousel.js";
import {
  initGlobalSearchHandlers,
  initLayoutSorting,
  initAdvancedSidebarFilters,
  filterProducts,
  normalizeText,
} from "./modules/search.js";
import { initChatbotWidget } from "./modules/chatbot.js";
import { initAuth, updateAuthButtons } from "./modules/auth.js";

// Expose globals for legacy inline handlers and existing tests
window.cart = cart;
window.updateCartBadge = updateCartBadge;
window.showCartModal = showCartModal;
window.parsePrice = parsePrice;
window.calculateCartSubtotal = calculateCartSubtotal;
window.computeShippingDetails = computeShippingDetails;
window.detectRegionFromAddress = detectRegionFromAddress;
window.formatVnd = formatVnd;
window.filterProducts = filterProducts;
window.normalizeText = normalizeText;

// Initialize all subsystems
function initApp() {
  initHeaderScroll();
  initAquaBubbles();
  updateCartBadge();
  initAddToCartButtons();
  initCartButtonNavigation();
  initCartPage();
  initBannerCarousel();
  initGlobalSearchHandlers();
  initLayoutSorting();
  initAdvancedSidebarFilters();
  initChatbotWidget();
  initAuth();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

export {
  cart,
  updateCartBadge,
  showCartModal,
  filterProducts,
  normalizeText,
};
