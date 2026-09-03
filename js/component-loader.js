/* ==========================================================================
   Sky Quest Holidays - Component Loader Engine
   --------------------------------------------------------------------------
   PURPOSE FOR BEGINNERS / FRESHERS:
   This file acts as a modular layout loader. Instead of putting 2000 lines of
   HTML inside index.html, we break the website into small HTML components
   (header.html, hero.html, packages.html, etc.) stored in the /components/ folder.

   HOW IT WORKS:
   1. The array `SKY_QUEST_COMPONENTS` maps each target <div> ID in index.html
      to its corresponding HTML file path.
   2. When the web page finishes loading (DOMContentLoaded), `loadComponents()` runs.
   3. If running over a web server (http:// or https://), it fetches each file
      and injects the inner HTML into the target placeholder tag.
   4. After all components are loaded, it dispatches the custom event "componentsLoaded".
   ========================================================================== */

// Array mapping HTML target IDs to component file locations
const SKY_QUEST_COMPONENTS = [
  { id: "header-component", path: "components/header.html" },
  { id: "hero-component", path: "components/hero.html" },
  { id: "trust-badges-component", path: "components/trust-badges.html" },
  { id: "packages-component", path: "components/packages.html" },
  { id: "gallery-component", path: "components/gallery.html" },
  { id: "about-component", path: "components/about.html" },
  { id: "why-choose-component", path: "components/why-choose-us.html" },
  { id: "testimonials-component", path: "components/testimonials.html" },
  { id: "blog-component", path: "components/blog.html" },
  { id: "contact-component", path: "components/contact.html" },
  { id: "faq-component", path: "components/faq.html" },
  { id: "modals-component", path: "components/modals.html" },
  { id: "footer-component", path: "components/footer.html" }
];

/**
 * Asynchronously loads HTML section files into container elements.
 */
async function loadComponents() {
  // Check if current web page is running over HTTP/HTTPS server (browsers block fetch() on file://)
  const isHttp = window.location.protocol.startsWith("http");

  for (const comp of SKY_QUEST_COMPONENTS) {
    const targetEl = document.getElementById(comp.id);
    if (!targetEl) continue;

    if (isHttp) {
      try {
        const response = await fetch(comp.path);
        if (response.ok) {
          targetEl.innerHTML = await response.text();
        }
      } catch (err) {
        console.warn(`[ComponentLoader] Could not fetch ${comp.path}, falling back to static content.`, err);
      }
    }
  }

  // Notify app.js that all dynamic HTML sections have been injected into the DOM
  document.dispatchEvent(new CustomEvent("componentsLoaded"));

  if (typeof renderGallery === 'function') {
    renderGallery();
  }
  if (typeof initGalleryFilters === 'function') {
    initGalleryFilters();
  }
}

// Start loading HTML components when initial DOM structure is ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
});
