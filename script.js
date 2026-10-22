/* =========================
   JOSHUA ALGUNO PORTFOLIO
   JavaScript interactions
========================= */

document.documentElement.classList.add("js-ready");

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

const navLinks = document.querySelectorAll(".nav-link");
const allNavLinks = document.querySelectorAll(".primary-nav a");
const sections = document.querySelectorAll("main section[id]");
const year = document.getElementById("year");

// Automatically update the copyright year.
if (year) {
  year.textContent = new Date().getFullYear();
}

// Close the mobile navigation menu.
function closeMenu() {
  if (!menuToggle || !primaryNav) return;

  primaryNav.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );
}

// Open or close the mobile navigation menu.
function toggleMenu() {
  if (!menuToggle || !primaryNav) return;

  const isExpanded =
    menuToggle.getAttribute("aria-expanded") === "true";

  const willOpen = !isExpanded;

  primaryNav.classList.toggle("open", willOpen);

  menuToggle.setAttribute(
    "aria-expanded",
    String(willOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    willOpen
      ? "Close navigation menu"
      : "Open navigation menu"
  );
}

// Set up navigation interactions.
if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", toggleMenu);

  // Close the menu after selecting a navigation link.
  allNavLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when Escape is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close the menu when clicking outside it.
  document.addEventListener("click", (event) => {
    const clickedInsideNav =
      primaryNav.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  // Close the mobile menu when returning to desktop size.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

// Highlight the navigation link for the visible section.
if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") ===
            `#${entry.target.id}`;

          link.classList.toggle("active", isCurrent);

          if (isCurrent) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Elements that will appear gently as the visitor scrolls.
const revealTargets = document.querySelectorAll(
  [
    ".section-heading",
    ".about-layout",
    ".skill-card",
    ".project-card",
    ".education-item",
    ".contact-inner"
  ].join(", ")
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

// Use IntersectionObserver for the reveal animation.
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Keep content visible if animations are unsupported or disabled.
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}