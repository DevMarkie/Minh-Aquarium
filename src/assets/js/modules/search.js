/**
 * src/assets/js/modules/search.js
 * Search and catalog filter logic
 */

export function normalizeText(value) {
  return (value || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^\w\s&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function filterProducts(query) {
  const isProductsPage = window.location.pathname.includes("products.html");
  if (isProductsPage) {
    const sidebar = document.querySelector(".sidebar-filter");
    const sidebarSearchInput = sidebar?.querySelector(".filter-input");
    if (sidebarSearchInput && sidebarSearchInput.value !== query) {
      sidebarSearchInput.value = query;
    }

    if (typeof window.applyAdvancedFilters === "function") {
      window.applyAdvancedFilters();
      return;
    }
  }

  const term = normalizeText(query);
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const title = card.querySelector(".product-name");
    const cat = card.querySelector(".product-cat");
    if (title || cat) {
      const matchName = title
        ? normalizeText(title.textContent).includes(term)
        : false;
      const matchCat = cat
        ? normalizeText(cat.textContent).includes(term)
        : false;
      if (term === "" || matchName || matchCat) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });

  const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
  if (sidebarLinks.length > 0) {
    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      const linkText = link.childNodes[0].textContent.trim().toLowerCase();
      if (term !== "" && linkText.includes(term)) {
        link.classList.add("active");
      } else if (term === "" && linkText === "tất cả sản phẩm") {
        link.classList.add("active");
      }
    });
  }
}

export function initGlobalSearchHandlers() {
  const searchInputs = document.querySelectorAll(".search-input");

  searchInputs.forEach((input) => {
    if (input.dataset.searchBound === "1") return;
    input.dataset.searchBound = "1";

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    if (q && !input.value) {
      input.value = q;
      if (window.location.pathname.includes("products.html")) {
        filterProducts(q);
      }
    }

    input.addEventListener("input", (e) => {
      if (window.location.pathname.includes("products.html")) {
        filterProducts(e.target.value);
      }
    });

    input.addEventListener("keydown", (e) => {
      if (
        e.key === "Enter" &&
        !window.location.pathname.includes("products.html")
      ) {
        window.location.href = `products.html?q=${encodeURIComponent(e.target.value.trim())}`;
      }
    });
  });

  document.querySelectorAll(".search-icon").forEach((icon) => {
    icon.style.cursor = "pointer";
    icon.addEventListener("click", () => {
      const input = icon.nextElementSibling;
      if (input && input.classList.contains("search-input")) {
        if (window.location.pathname.includes("products.html")) {
          filterProducts(input.value);
        } else {
          if (input.value.trim()) {
            window.location.href = `products.html?q=${encodeURIComponent(input.value.trim())}`;
          } else {
            window.location.href = `products.html`;
          }
        }
      }
    });
  });
}

export function initLayoutSorting() {
  const sortSelect = document.querySelector(".sort-select");
  const productGrid = document.querySelector(".product-grid");

  if (!sortSelect || !productGrid) return;

  const originalOrder = Array.from(productGrid.querySelectorAll(".product-card"));

  sortSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    const currentCards = Array.from(productGrid.querySelectorAll(".product-card"));

    if (val === "featured" || val === "newest") {
      const arr = val === "newest" ? [...originalOrder].reverse() : originalOrder;
      arr.forEach((card) => productGrid.appendChild(card));
    } else if (val === "price-asc" || val === "price-desc") {
      currentCards.sort((a, b) => {
        const priceAStr = a.querySelector(".price-current")?.textContent || "0";
        const priceBStr = b.querySelector(".price-current")?.textContent || "0";
        const priceA = parseInt(priceAStr.replace(/[^0-9]/g, "")) || 0;
        const priceB = parseInt(priceBStr.replace(/[^0-9]/g, "")) || 0;
        return val === "price-asc" ? priceA - priceB : priceB - priceA;
      });
      currentCards.forEach((card) => productGrid.appendChild(card));
    }
  });
}

export function initAdvancedSidebarFilters() {
  const sidebar = document.querySelector(".sidebar-filter");
  if (!sidebar) return;

  const headerSearchInput = document.querySelector(".header-main .search-input");
  const searchInput = sidebar.querySelector(".filter-input");
  const checkboxes = sidebar.querySelectorAll('.checkbox-list input[type="checkbox"]');
  const priceInputs = sidebar.querySelectorAll(".price-inputs .price-input");
  const clearBtn = sidebar.querySelector(".btn-clear-filter");
  const productGrid = document.querySelector(".product-grid");
  const countDisplay = document.querySelector(".page-subtitle");

  function applyAdvancedFilters() {
    const cards = Array.from(productGrid.querySelectorAll(".product-card"));

    const searchTerm = normalizeText(
      searchInput?.value || headerSearchInput?.value || ""
    );

    const checkedCats = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => {
        const rawCat = cb.dataset.category || cb.parentElement.textContent;
        return normalizeText(rawCat);
      });

    let minPrice = parseInt(priceInputs[0]?.value) || 0;
    let maxPrice = parseInt(priceInputs[1]?.value) || 999999999;
    if (minPrice > maxPrice) {
      const tmp = minPrice;
      minPrice = maxPrice;
      maxPrice = tmp;
    }

    let visibleCount = 0;

    cards.forEach((card) => {
      const title = normalizeText(card.querySelector(".product-name")?.textContent || "");
      const cat = normalizeText(card.querySelector(".product-cat")?.textContent || "");
      const priceStr = card.querySelector(".price-current")?.textContent || "0";
      const price = parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;

      const matchSearch =
        searchTerm === "" || title.includes(searchTerm) || cat.includes(searchTerm);

      const matchCat =
        checkedCats.length === 0 ||
        checkedCats.some(
          (checkedCat) => cat.includes(checkedCat) || checkedCat.includes(cat)
        );

      const matchPrice = price >= minPrice && price <= maxPrice;

      if (matchSearch && matchCat && matchPrice) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Tìm thấy ${visibleCount} sản phẩm`;
    }
  }

  window.applyAdvancedFilters = applyAdvancedFilters;

  if (searchInput) searchInput.addEventListener("input", applyAdvancedFilters);
  if (headerSearchInput) headerSearchInput.addEventListener("input", applyAdvancedFilters);

  checkboxes.forEach((cb) => cb.addEventListener("change", applyAdvancedFilters));

  priceInputs.forEach((input) => {
    input.addEventListener("change", applyAdvancedFilters);
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") applyAdvancedFilters();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (headerSearchInput) headerSearchInput.value = "";
      checkboxes.forEach((cb) => (cb.checked = false));
      if (priceInputs.length === 2) {
        priceInputs[0].value = 0;
        priceInputs[1].value = 10000000;
      }
      applyAdvancedFilters();
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get("q") || "";
  if (q) {
    if (searchInput) searchInput.value = q;
    if (headerSearchInput) headerSearchInput.value = q;
  }
  applyAdvancedFilters();
}
