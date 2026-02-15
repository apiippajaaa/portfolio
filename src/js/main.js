document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const heroSection = document.querySelector("#hero");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  const carousel = document.querySelector(".carousel");
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-item");

  /* =============================
     HERO OBSERVER (Scroll Indicator)
  ============================== */
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          scrollIndicator.classList.add("is-hidden");
        } else {
          scrollIndicator.classList.remove("is-hidden");
        }
      });
    },
    { threshold: 0.15 }
  );

  if (heroSection) heroObserver.observe(heroSection);

  /* =============================
     REVEAL OBSERVER
  ============================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  /* =============================
     CAROUSEL
  ============================== */

  if (!carousel || !track || slides.length === 0) return;

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let isMobile = window.innerWidth < 768;

  const updatePosition = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const enableCarousel = () => {
    track.style.display = "flex";
    slides.forEach((slide) => (slide.style.minWidth = "100%"));
  };

  const disableCarousel = () => {
    track.style.transform = "none";
    track.style.transition = "none";
    index = 0;
  };

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    isDragging = true;
    startX = e.touches[0].clientX;
    track.style.transition = "none";
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isMobile) return;

    currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    track.style.transform = `translateX(calc(-${index * 100}% + ${diff}px))`;
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isMobile) return;

    isDragging = false;
    const diff = currentX - startX;

    track.style.transition = "transform 0.35s ease";

    if (diff < -70 && index < slides.length - 1) {
      index++;
    }

    if (diff > 70 && index > 0) {
      index--;
    }

    updatePosition();
  };

  const handleResize = () => {
    isMobile = window.innerWidth < 768;

    if (!isMobile) {
      disableCarousel();
    } else {
      enableCarousel();
      updatePosition();
    }
  };

  // INIT
  handleResize();

  track.addEventListener("touchstart", handleTouchStart);
  track.addEventListener("touchmove", handleTouchMove);
  track.addEventListener("touchend", handleTouchEnd);
  window.addEventListener("resize", handleResize);
});
