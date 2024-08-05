AOS.init();

const carousel = document.querySelector(".carousel");
const slides = carousel.querySelectorAll(".slide");
const dotsContainer = carousel.querySelector(".dots");
const timer = carousel.querySelector(".timer");
const prevButton = carousel.querySelector(".prev");
const nextButton = carousel.querySelector(".next");
const pausePlayButton = carousel.querySelector(".pause-play-button");
const pausePlayIcon = pausePlayButton.querySelector("svg");
const pausePlayLabel = pausePlayButton.querySelector("span");

let currentSlide = 0;
const slideInterval = 4000; // 4 seconds
let slideTimer;
let isPaused = false;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  dotsContainer.children[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dotsContainer.children[currentSlide].classList.add("active");
  resetTimer();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Timer animation
function resetTimer() {
  if (isPaused) return;
  clearTimeout(slideTimer);
  timer.style.transition = "none";
  timer.style.width = "0%";
  setTimeout(() => {
    timer.style.transition = "width 4s linear";
    timer.style.width = "100%";
  }, 10);
  slideTimer = setTimeout(nextSlide, slideInterval);
}

// Pause functionality
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    pausePlayIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    pausePlayLabel.textContent = "Play";
    pausePlayButton.setAttribute("aria-label", "Play carousel");
    clearTimeout(slideTimer);
    timer.style.transition = "none";
  } else {
    pausePlayIcon.innerHTML = '<path d="M6 4h4v16H6zm8 0h4v16h-4z"/>';
    pausePlayLabel.textContent = "Pause";
    pausePlayButton.setAttribute("aria-label", "Pause carousel");
    resetTimer();
  }
}

// Focal point adjustment
function adjustFocalPoint() {
  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    const focalX = img.dataset.focalX / 100;
    const focalY = img.dataset.focalY / 100;

    const containerAspect = carousel.offsetWidth / carousel.offsetHeight;
    const imageAspect = img.naturalWidth / img.naturalHeight;

    let scale, translateX, translateY;

    if (containerAspect > imageAspect) {
      // Container is wider than the image
      scale = carousel.offsetWidth / img.naturalWidth;
      translateX = 0;
      translateY = (carousel.offsetHeight - img.naturalHeight * scale) * focalY;
    } else {
      // Container is taller than the image
      scale = carousel.offsetHeight / img.naturalHeight;
      translateX = (carousel.offsetWidth - img.naturalWidth * scale) * focalX;
      translateY = 0;
    }

    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  });
}

// Event listeners
prevButton.addEventListener("click", (e) => {
  e.preventDefault();
  prevSlide();
});

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  nextSlide();
});

pausePlayButton.addEventListener("click", togglePause);

window.addEventListener("resize", adjustFocalPoint);

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);

carousel.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false
);

function handleSwipe() {
  if (touchEndX < touchStartX) {
    nextSlide();
  }
  if (touchEndX > touchStartX) {
    prevSlide();
  }
}

// Initialize
adjustFocalPoint();
resetTimer();

document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.querySelector(".marquee-inner");
  const speed = 1; // Scrolling Speed
  let scrollAmount = 0;
  let isHovered = false;

  // Duplicates the content
  const marqueeContent = marquee.innerHTML;
  marquee.innerHTML += marqueeContent;

  const startScrolling = () => {
    if (!isHovered) {
      scrollAmount -= speed;
      if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2) {
        scrollAmount = 0;
      }
      marquee.style.transform = `translateX(${scrollAmount}px)`;
    }
    requestAnimationFrame(startScrolling);
  };

  marquee.addEventListener("mouseover", () => {
    isHovered = true;
  });

  marquee.addEventListener("mouseout", () => {
    isHovered = false;
  });

  startScrolling();
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the current date
  const date = new Date();

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the current month
  const currentMonth = months[date.getMonth()];

  // Insert the current month into the placeholder
  const monthElements = document.querySelectorAll(".current-month");
  console.log(monthElements);

  // Insert the current month into each element
  monthElements.forEach(function (element) {
    element.textContent = currentMonth;
  });
});
