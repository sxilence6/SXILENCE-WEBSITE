const filterButtons = document.querySelectorAll("[data-filter]");
const archiveItems = document.querySelectorAll(".bleed-entry");
const signal = document.querySelector("[data-signal]");

const signals = [
  "body mounted / menu damaged",
  "sxilence layer leaking",
  "matteo layer available",
  "crash report not finalized",
  "soft pillow / hard chrome",
  "sideways menu still breathing",
  "prosthetic file attached"
];

function setActiveFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  archiveItems.forEach((item) => {
    const tags = item.dataset.tags || "";
    const shouldShow = filter === "all" || tags.split(" ").includes(filter);
    item.classList.toggle("is-hidden", !shouldShow);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  archiveItems.forEach((item) => observer.observe(item));
} else {
  archiveItems.forEach((item) => item.classList.add("visible"));
}

if (signal) {
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % signals.length;
    signal.textContent = signals[index];
  }, 3600);
}

const roamingTiles = Array.from(document.querySelectorAll(".video-tile"));
const roamingVideos = roamingTiles.map((tile) => tile.querySelector("video")).filter(Boolean);

if (roamingVideos.length) {
  const rotationMin = 4000;
  const rotationMax = 6000;
  let soundUnlocked = false;
  let activeIndex = -1;
  let hoverIndex = -1;
  let rotationTimer = null;

  function nextDelay() {
    return rotationMin + Math.random() * (rotationMax - rotationMin);
  }

  function randomDifferentIndex() {
    if (roamingVideos.length < 2) {
      return 0;
    }

    let nextIndex = activeIndex;
    while (nextIndex === activeIndex) {
      nextIndex = Math.floor(Math.random() * roamingVideos.length);
    }
    return nextIndex;
  }

  function clearRotation() {
    if (rotationTimer) {
      window.clearTimeout(rotationTimer);
      rotationTimer = null;
    }
  }

  function setActiveSound(index) {
    if (!soundUnlocked || index < 0) {
      return;
    }

    activeIndex = index;
    roamingVideos.forEach((video, videoIndex) => {
      video.muted = videoIndex !== activeIndex;
      video.play().catch(() => {});
    });
  }

  function scheduleRotation() {
    clearRotation();
    if (!soundUnlocked || hoverIndex !== -1 || roamingVideos.length < 2) {
      return;
    }

    rotationTimer = window.setTimeout(() => {
      setActiveSound(randomDifferentIndex());
      scheduleRotation();
    }, nextDelay());
  }

  function unlockSound() {
    if (soundUnlocked) {
      return;
    }

    soundUnlocked = true;
    setActiveSound(hoverIndex !== -1 ? hoverIndex : Math.floor(Math.random() * roamingVideos.length));
    scheduleRotation();
  }

  roamingVideos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
  });

  roamingTiles.forEach((tile, tileIndex) => {
    tile.addEventListener("pointerenter", () => {
      hoverIndex = tileIndex;
      clearRotation();
      setActiveSound(tileIndex);
    });

    tile.addEventListener("pointerleave", () => {
      if (hoverIndex === tileIndex) {
        hoverIndex = -1;
      }
      scheduleRotation();
    });
  });

  document.addEventListener("pointerdown", unlockSound, { once: true });
  document.addEventListener("keydown", unlockSound, { once: true });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGfxLightbox();
  }

  if (event.key === "ArrowLeft") {
    navigateGfx(-1);
  }

  if (event.key === "ArrowRight") {
    navigateGfx(1);
  }
});

const gfxLightbox = document.getElementById("gfxLightbox");
const lbImages = [];
let gfxIndex = 0;

function openGfxLightbox(index) {
  if (!gfxLightbox) return;
  gfxIndex = index;
  const img = lbImages[gfxIndex];
  gfxLightbox.querySelector("img").src = img.src;
  gfxLightbox.querySelector("img").alt = img.alt;
  gfxLightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeGfxLightbox() {
  if (!gfxLightbox || gfxLightbox.hidden) return;
  gfxLightbox.hidden = true;
  document.body.style.overflow = "";
}

function navigateGfx(dir) {
  if (!gfxLightbox || gfxLightbox.hidden || !lbImages.length) return;
  gfxIndex = (gfxIndex + dir + lbImages.length) % lbImages.length;
  const img = lbImages[gfxIndex];
  gfxLightbox.querySelector("img").src = img.src;
  gfxLightbox.querySelector("img").alt = img.alt;
}

function registerLbFigure(figure) {
  const img = figure.querySelector("img");
  if (!img || img.closest("a")) return;
  const index = lbImages.length;
  lbImages.push(img);
  figure.classList.add("lb-clickable");
  figure.addEventListener("click", () => openGfxLightbox(index));
}

document.querySelectorAll(".vfx-study-feed figure").forEach(registerLbFigure);
document.querySelectorAll(".doc-grid .doc-item").forEach(registerLbFigure);

const heroImg = document.querySelector(".work-hero-image > img");
if (heroImg) {
  const index = lbImages.length;
  lbImages.push(heroImg);
  heroImg.classList.add("lb-clickable");
  heroImg.addEventListener("click", () => openGfxLightbox(index));
}

gfxLightbox?.querySelector(".gfx-lb-close")?.addEventListener("click", closeGfxLightbox);
gfxLightbox?.querySelector(".gfx-lb-prev")?.addEventListener("click", () => navigateGfx(-1));
gfxLightbox?.querySelector(".gfx-lb-next")?.addEventListener("click", () => navigateGfx(1));

gfxLightbox?.addEventListener("click", (event) => {
  if (event.target === gfxLightbox) closeGfxLightbox();
});

document.querySelectorAll("[data-slider]").forEach((slider) => {
  const track = slider.querySelector("[data-slider-track]");
  const slides = Array.from(track?.children || []);
  const previous = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  const dots = slider.querySelector("[data-slider-dots]");
  const autoDelay = Number(slider.dataset.auto || 0);
  let current = 0;
  let timer = null;

  if (!track || slides.length < 2) {
    return;
  }

  function goTo(index, stopAuto = false) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots?.querySelectorAll("button").forEach((dot, dotIndex) => {
      const isActive = dotIndex === current;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    if (stopAuto && timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  if (dots) {
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `show image ${index + 1}`);
      dot.addEventListener("click", () => goTo(index, true));
      dots.append(dot);
    });
  }

  previous?.addEventListener("click", () => goTo(current - 1, true));
  next?.addEventListener("click", () => goTo(current + 1, true));

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      goTo(current - 1, true);
    }

    if (event.key === "ArrowRight") {
      goTo(current + 1, true);
    }
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (autoDelay > 0 && !prefersReducedMotion) {
    timer = window.setInterval(() => goTo(current + 1), autoDelay);
    const stopTimer = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };
    slider.addEventListener("focusin", stopTimer);
  }

  goTo(0);
});
