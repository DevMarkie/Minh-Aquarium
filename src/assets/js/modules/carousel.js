/**
 * src/assets/js/modules/carousel.js
 * Banner Carousel Slider Module
 */

export function initBannerCarousel() {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(document.querySelectorAll(".carousel-slide") || []);
  const nextButton = document.querySelector(".carousel-nav.next");
  const prevButton = document.querySelector(".carousel-nav.prev");
  const dots = Array.from(document.querySelectorAll(".dot") || []);

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoplayInterval;

  const updateSlide = (index) => {
    track.style.transform = `translateX(-${index * (100 / slides.length)}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) {
      dots[index].classList.add("active");
    }
    currentIndex = index;
  };

  const nextSlide = () => {
    let targetIndex = currentIndex + 1;
    if (targetIndex >= slides.length) targetIndex = 0;
    updateSlide(targetIndex);
  };

  const prevSlide = () => {
    let targetIndex = currentIndex - 1;
    if (targetIndex < 0) targetIndex = slides.length - 1;
    updateSlide(targetIndex);
  };

  const startAutoplay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  };

  startAutoplay();

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSlide(index);
      startAutoplay();
    });
  });
}
