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

const videoLightbox = document.querySelector("[data-video-lightbox]");
const videoLightboxPlayer = videoLightbox?.querySelector("video");
const videoLightboxClose = document.querySelector("[data-video-close]");

document.querySelectorAll("[data-video-src]").forEach((tile) => {
  tile.addEventListener("click", () => {
    if (!videoLightbox || !videoLightboxPlayer) {
      return;
    }

    videoLightbox.hidden = false;
    videoLightboxPlayer.src = tile.dataset.videoSrc;
    videoLightboxPlayer.muted = false;
    videoLightboxPlayer.loop = false;
    videoLightboxPlayer.play();
  });
});

function closeVideoLightbox() {
  if (!videoLightbox || !videoLightboxPlayer) {
    return;
  }

  videoLightboxPlayer.pause();
  videoLightboxPlayer.removeAttribute("src");
  videoLightboxPlayer.load();
  videoLightbox.hidden = true;
}

videoLightboxClose?.addEventListener("click", closeVideoLightbox);
videoLightbox?.addEventListener("click", (event) => {
  if (event.target === videoLightbox) {
    closeVideoLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideoLightbox();
  }
});
