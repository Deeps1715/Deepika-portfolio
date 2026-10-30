
// ========================================
// DEEPIKA RAJKUMAR — PORTFOLIO INTERACTIONS
// ========================================

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// HEADER AND SCROLL PROGRESS

const header = document.getElementById("header");
const progress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  progress.style.width = `${percentage}%`;

  header.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

// SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay =
        `${Math.min(index * 65, 260)}ms`;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -35px 0px"
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// PHOTO POINTER MOVEMENT

const portraitFrame = document.getElementById("portraitFrame");

if (
  portraitFrame &&
  window.matchMedia("(pointer: fine)").matches
) {
  const heroArt = portraitFrame.closest(".hero-art");

  heroArt.addEventListener("pointermove", event => {
    const rect = heroArt.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    portraitFrame.style.setProperty("--move-x", `${x * 9}px`);
    portraitFrame.style.setProperty("--move-y", `${y * 9}px`);
  });

  heroArt.addEventListener("pointerleave", () => {
    portraitFrame.style.setProperty("--move-x", "0px");
    portraitFrame.style.setProperty("--move-y", "0px");
  });
}

// PROJECT CARD POINTER EFFECT

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--pointer-x", `${x * 2}deg`);
      card.style.setProperty("--pointer-y", `${y * -2}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--pointer-x", "0deg");
      card.style.setProperty("--pointer-y", "0deg");
    });
  });
}

// FOOTER YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();

// IMAGE FALLBACK

const portrait = document.querySelector(".portrait");

portrait.addEventListener("error", () => {
  portrait.alt = "Portrait image could not be loaded. Check assets/deepika-photo.jpeg.";
  portrait.style.display = "none";

  const frame = document.getElementById("portraitFrame");
  frame.style.background =
    "linear-gradient(145deg, #243f8e, #121a36)";

  frame.style.display = "grid";
  frame.style.placeItems = "center";

  const message = document.createElement("span");
  message.textContent = "Add your photo";
  message.style.color = "white";
  message.style.fontSize = "14px";

  frame.appendChild(message);
});
