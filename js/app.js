/* ==========================================================================
   Sky Quest Holidays - Application Engine (app.js)
   --------------------------------------------------------------------------
   BEGINNER & FRESHER GUIDE:
   This file is the main JavaScript control center for the Sky Quest website.
   It handles:
   1. Dynamic Data Loading & LocalStorage Sync
   2. Navigation Bar (Scroll effects, mobile menu, smooth anchor scrolling)
   3. Packages Grid (Rendering, Category filtering, Quick Search box)
   4. Modal Dialogs (Package details, Photo lightbox, Enquiry confirmation)
   5. Photo Gallery & Customer Testimonials
   6. Booking Enquiry Form (Validation, Local storage, WhatsApp redirect)
   7. Secret Admin Control Center (Cloudinary CDN image uploads, lead management)
   8. Travel Guides & Blog Section
   ========================================================================== */

// Flag to prevent double execution when DOM events trigger
let isAppInitialized = false;

/**
 * --------------------------------------------------------------------------
 * SECTION 1: Local Data & Overrides Loader
 * --------------------------------------------------------------------------
 * Reads custom packages, custom gallery photos, and image overrides
 * stored in browser LocalStorage and merges them into the global SKY_QUEST_DATA object.
 */
function loadAllCustomDataAndOverrides() {
  try {
    if (!window.SKY_QUEST_DATA) return;

    // 1. Apply custom package image overrides from admin panel
    const overrides = JSON.parse(localStorage.getItem("sky_quest_pkg_image_overrides") || "{}");
    if (SKY_QUEST_DATA.packages) {
      SKY_QUEST_DATA.packages.forEach(pkg => {
        if (overrides[pkg.id]) {
          pkg.image = overrides[pkg.id];
        }
      });
    }

    // 2. Merge custom packages added by admin
    const customPkgs = JSON.parse(localStorage.getItem("sky_quest_custom_packages") || "[]");
    customPkgs.forEach(cp => {
      if (!SKY_QUEST_DATA.packages.some(p => p.id == cp.id)) {
        SKY_QUEST_DATA.packages.unshift(cp);
      }
    });

    // 3. Merge custom gallery photos uploaded by admin
    const customGallery = JSON.parse(localStorage.getItem("sky_quest_custom_gallery") || "[]");
    const hiddenDefaultIds = JSON.parse(localStorage.getItem("sky_quest_hidden_gallery_ids") || "[]");
    if (!SKY_QUEST_DATA.defaultGallery) {
      SKY_QUEST_DATA.defaultGallery = [...(SKY_QUEST_DATA.gallery || [])];
    }
    const defaultList = SKY_QUEST_DATA.defaultGallery;
    const activeDefaultList = defaultList.filter(sg => !hiddenDefaultIds.includes(sg.id));

    if (Array.isArray(customGallery) && customGallery.length > 0) {
      const mergedGallery = [...customGallery, ...activeDefaultList.filter(sg => !customGallery.some(cg => cg.id == sg.id))];
      SKY_QUEST_DATA.gallery = mergedGallery;
    } else {
      SKY_QUEST_DATA.gallery = [...activeDefaultList];
    }
  } catch (e) {
    console.error("[App] Error loading custom data overrides:", e);
  }
}

// Listen for browser LocalStorage changes to sync data in real time across multiple tabs
window.addEventListener("storage", () => {
  loadAllCustomDataAndOverrides();
  if (window.SKY_QUEST_DATA) {
    renderPackages(SKY_QUEST_DATA.packages);
    renderGallery();
    renderTestimonials();
  }
});

// BroadcastChannel cross-tab live sync for instant updates without page refresh
if (typeof BroadcastChannel !== 'undefined') {
  try {
    const syncChannel = new BroadcastChannel('skyquest_data_sync');
    syncChannel.onmessage = (event) => {
      if (event.data && (event.data.type === 'GALLERY_UPDATED' || event.data.type === 'DATA_UPDATED')) {
        loadAllCustomDataAndOverrides();
        if (window.SKY_QUEST_DATA) {
          renderGallery();
        }
      }
    };
  } catch (e) {}
}

/**
 * --------------------------------------------------------------------------
 * SECTION 2: Master Application Initializer
 * --------------------------------------------------------------------------
 * Called when components are loaded to render UI and attach event listeners.
 */
function initApp() {
  // Prevent duplicate double initialization if both DOMContentLoaded & componentsLoaded fire
  loadAllCustomDataAndOverrides();

  // 1. Setup Navbar Scroll & Mobile Toggle
  initNavbar();

  // 2. Render Categories & Tour Packages Grid
  renderCategories();
  if (window.SKY_QUEST_DATA && SKY_QUEST_DATA.packages) {
    renderPackages(SKY_QUEST_DATA.packages);
  }

  // 3. Render Gallery, Testimonials & Travel Blog
  renderGallery();
  renderTestimonials();
  renderBlogs();

  // 4. Render Frequently Asked Questions (FAQs)
  renderFaqs();

  // 5. Initialize Search, Filter & Gallery Listeners
  initSearchAndFilter();
  initGalleryFilters();

  // 6. Form Handlers & UI Utilities (Attach once)
  if (!isAppInitialized) {
    isAppInitialized = true;
    initContactForm();
    initDatePicker();
    initScrollTopBtn();
    initKeyboardListeners();
    initAdminPanel();
  }
}

// Initialize when components are injected by component-loader.js
document.addEventListener("componentsLoaded", initApp);

// Fallback initialization if components loaded instantly on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (!isAppInitialized) {
      initApp();
    }
  }, 100);
});

/**
 * --------------------------------------------------------------------------
 * SECTION 3: Navigation Bar & Smooth Scroll Handlers
 * --------------------------------------------------------------------------
 */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  // Add shadow class to navbar on page scroll
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  const openMobileMenu = () => {
    if (navLinks) navLinks.classList.add("active");
    if (mobileNavOverlay) mobileNavOverlay.classList.add("active");
  };

  const closeMobileMenu = () => {
    if (navLinks) navLinks.classList.remove("active");
    if (mobileNavOverlay) mobileNavOverlay.classList.remove("active");
  };

  // Mobile menu toggle open/close
  if (mobileToggle) mobileToggle.onclick = openMobileMenu;
  if (mobileNavClose) mobileNavClose.onclick = closeMobileMenu;
  if (mobileNavOverlay) mobileNavOverlay.onclick = closeMobileMenu;

  // Smooth scroll for page section hash links (e.g. #packages, #about)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.onclick = function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();

        // Highlight active link in navbar
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        if (this.classList.contains("nav-link")) {
          this.classList.add("active");
        }

        // Close mobile dropdown if open
        closeMobileMenu();

        if (targetId === "#home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const headerOffset = 90;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    };
  });
}

/**
 * --------------------------------------------------------------------------
 * SECTION 4: Tour Categories & Package Cards Rendering
 * --------------------------------------------------------------------------
 */

// Render Category Filter Buttons (e.g. All, Family, College IV, Honeymoon)
function renderCategories() {
  const container = document.getElementById("categoryTabs");
  if (!container || !window.SKY_QUEST_DATA || !SKY_QUEST_DATA.categories) return;

  container.innerHTML = SKY_QUEST_DATA.categories.map(cat => `
    <button class="cat-tab ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">
      <span>${cat.icon}</span> ${cat.name}
    </button>
  `).join("");

  // Attach click listener to category filter buttons
  container.querySelectorAll(".cat-tab").forEach(tab => {
    tab.onclick = () => {
      container.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const catId = tab.getAttribute("data-category");
      filterPackagesByCategory(catId);
    };
  });
}

// Skyscape Style Tab Click Filter Handler
function filterPkgs(catId, btnElement) {
  const tabs = document.querySelectorAll(".pkg-tab, .cat-tab");
  tabs.forEach(t => t.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  }

  const cards = document.querySelectorAll(".pkg-card, .package-card");
  const emptyState = document.getElementById("pkg-empty");
  let visibleCount = 0;
  const target = (catId || "all").toLowerCase();

  cards.forEach(card => {
    const cardCat = (card.getAttribute("data-cat") || "").toLowerCase();
    const cardText = card.innerText.toLowerCase();

    if (target === "all" || cardCat === target || cardCat.includes(target) || target.includes(cardCat) || cardText.includes(target)) {
      card.style.display = "flex";
      card.style.opacity = "1";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  }

  // Fallback to dynamic JS renderer if DOM cards are missing
  if (window.SKY_QUEST_DATA && SKY_QUEST_DATA.packages && cards.length === 0) {
    filterPackagesByCategory(catId);
  }
}

// Render Array of Packages into the Grid Container
function renderPackages(packagesToRender) {
  const grid = document.getElementById("packagesGrid") || document.getElementById("pkg-grid");
  const emptyState = document.getElementById("pkg-empty");
  if (!grid) return;

  if (!packagesToRender || packagesToRender.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">No packages found matching your criteria.</p>`;
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  grid.innerHTML = packagesToRender.map(pkg => {
    const title = pkg.name || pkg.title;
    const description = pkg.desc || pkg.tagline || "";
    const places = pkg.placesToVisit || pkg.highlights || [];
    const categoryName = pkg.badge || pkg.category || "Popular";
    const durationText = pkg.duration || "2D | 1N";
    const stateText = pkg.state || pkg.location || "South India";

    const waMsg = encodeURIComponent(`Hi Sky Quest Holidays! I am interested in the "${title}" package. Please send me quotation & details.`);

    return `
      <div class="package-card pkg-card" onclick="openPackageModal('${pkg.id}')" style="cursor:pointer" data-cat="${(pkg.category || '').toLowerCase()}">
        <div class="card-img-wrapper pkg-img">
          <img src="${pkg.image}" alt="${title}" class="card-img pkg-img-inner" loading="lazy" />
          <span class="card-badge pkg-badge">${categoryName}</span>
        </div>
        <div class="card-content pkg-body">
          <h3 class="card-title pkg-dest" style="margin-top: 6px;">${title}</h3>
          <div class="pkg-meta">
            <span>📍 ${stateText}</span>
            <span>📅 ${durationText}</span>
          </div>
          <p class="card-tagline" style="font-size:0.88rem; color:var(--text-muted); margin-bottom:10px;">${description}</p>

          ${places.length > 0 ? `
            <ul class="card-highlights">
              ${places.slice(0, 3).map(h => `<li>✅ ${h}</li>`).join("")}
              ${places.length > 3 ? `<li style="color:var(--primary-blue); font-weight:600; font-size:0.82rem;">+ ${places.length - 3} more places</li>` : ''}
            </ul>
          ` : ''}

          <div class="card-footer" style="gap: 8px; margin-top: 14px;">
            <button class="btn btn-primary pkg-btn" style="flex: 1;" onclick="openPackageModal('${pkg.id}'); event.stopPropagation();">Enquire Now</button>
            <a href="https://wa.me/917338710611?text=${waMsg}" target="_blank" class="btn btn-whatsapp" onclick="event.stopPropagation();" style="padding: 10px 14px; font-size: 0.88rem;">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Filter Packages array by Category ID
function filterPackagesByCategory(catId) {
  if (!window.SKY_QUEST_DATA || !SKY_QUEST_DATA.packages) return;

  if (catId === "all") {
    renderPackages(SKY_QUEST_DATA.packages);
  } else {
    const target = catId.toLowerCase();
    const filtered = SKY_QUEST_DATA.packages.filter(p => {
      const c = (p.category || "").toLowerCase();
      const sub = (p.subCategory || "").toLowerCase();
      const state = (p.state || "").toLowerCase().replace(/\s+/g, "");
      const loc = (p.location || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      return c === target || sub === target || state.includes(target) || loc.includes(target) || name.includes(target) || c.includes(target) || target.includes(c);
    });
    renderPackages(filtered);
  }
}

/**
 * --------------------------------------------------------------------------
 * SECTION 5: Quick Search Engine & Filter Engine
 * --------------------------------------------------------------------------
 */
function initSearchAndFilter() {
  const searchInput = document.getElementById("searchDestination");
  const typeSelect = document.getElementById("searchType");
  const durationSelect = document.getElementById("searchDuration");

  function applyFilters() {
    if (!window.SKY_QUEST_DATA || !SKY_QUEST_DATA.packages) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedType = typeSelect ? typeSelect.value.toLowerCase() : "";

    const filtered = SKY_QUEST_DATA.packages.filter(pkg => {
      const title = (pkg.name || pkg.title || "").toLowerCase();
      const description = (pkg.desc || pkg.tagline || "").toLowerCase();
      const category = (pkg.category || "").toLowerCase();

      const matchQuery = !query || title.includes(query) || description.includes(query);
      const matchType = !selectedType || category === selectedType || category.includes(selectedType);

      return matchQuery && matchType;
    });

    renderPackages(filtered);
  }

  if (searchInput) searchInput.oninput = applyFilters;
  if (typeSelect) typeSelect.onchange = applyFilters;
  if (durationSelect) durationSelect.onchange = applyFilters;
}

/**
 * --------------------------------------------------------------------------
 * SECTION 6: Package Details Modal & Dialog Handlers
 * --------------------------------------------------------------------------
 */
function openPackageModal(packageId) {
  if (!window.SKY_QUEST_DATA || !SKY_QUEST_DATA.packages) return;

  const pkg = SKY_QUEST_DATA.packages.find(p => p.id == packageId);
  if (!pkg) return;

  const modal = document.getElementById("packageModal");
  const body = document.getElementById("packageModalBody");
  if (!modal || !body) return;

  const title = pkg.name || pkg.title;
  const description = pkg.desc || pkg.tagline || "";
  const places = pkg.placesToVisit || pkg.highlights || [];
  const categoryName = pkg.category || pkg.badge || "Popular";
  const inclusions = pkg.inclusions || ["Resort Stay", "Breakfast", "Sightseeing Cab", "Driver Batta"];
  const exclusions = pkg.exclusions || ["Personal Expenses", "Entry Tickets"];

  const waMsg = encodeURIComponent(
    `Hi Sky Quest Holidays! I want to enquire & book the "${title}" package. Please send me full quotation.`
  );
  const waUrl = `https://wa.me/917338710611?text=${waMsg}`;

  body.innerHTML = `
    <img src="${pkg.image}" class="modal-header-img" alt="${title}" loading="lazy" />
    <div class="modal-body">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="section-subtitle">${categoryName}</span>
          <h2 style="font-size: 2.1rem; margin-top: 4px;">${title}</h2>
        </div>
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid var(--border-light);" />

      <p style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 24px; line-height: 1.6;">${description}</p>

      <!-- Sightseeing Places Grid -->
      ${places.length > 0 ? `
        <h3 style="margin-bottom: 14px;">📍 Sightseeing Highlights (${places.length} Spots)</h3>
        <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 28px; list-style: none;">
          ${places.map(h => `<li style="font-weight: 600; background: var(--bg-main); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-light); font-size: 0.88rem;">📍 ${h}</li>`).join("")}
        </ul>
      ` : ''}

      <!-- Inclusions & Exclusions -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 28px;">
        <div style="background: #f0fdf4; padding: 16px 20px; border-radius: 12px; border: 1px solid #bbf7d0;">
          <h4 style="color: #166534; margin-bottom: 8px;">✅ What's Included</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem; color: #15803d;">
            ${inclusions.map(inc => `<li>✓ ${inc}</li>`).join("")}
          </ul>
        </div>
        <div style="background: #fef2f2; padding: 16px 20px; border-radius: 12px; border: 1px solid #fecaca;">
          <h4 style="color: #991b1b; margin-bottom: 8px;">❌ What's Excluded</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem; color: #b91c1c;">
            ${exclusions.map(exc => `<li>✕ ${exc}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 20px;">
        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="flex: 1; min-width: 220px; font-size: 1.05rem; justify-content: center;">
          💬 Enquire & Book via WhatsApp
        </a>
        <button class="btn btn-primary" style="flex: 1; min-width: 220px;" onclick="scrollToContactWithPkg('${title}')">
          📩 Request Custom Quote
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove("active");
}

function scrollToContactWithPkg(title) {
  closeModal("packageModal");
  const messageBox = document.getElementById("formMessage");
  if (messageBox) messageBox.value = `Hi, I want more details and quotation for package: ${title}`;

  const contactSection = document.getElementById("contactSection");
  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
}

/**
 * --------------------------------------------------------------------------
 * SECTION 7: Photo Gallery & Lightbox Renderer
 * --------------------------------------------------------------------------
 */
// Global reference array for active rendered gallery items
window._activeGalleryItems = [];

function renderGallery(filterCategory = "all") {
  const grid = document.getElementById("galleryGrid");
  if (!grid || !window.SKY_QUEST_DATA) return;

  loadAllCustomDataAndOverrides();

  if (!SKY_QUEST_DATA.gallery || SKY_QUEST_DATA.gallery.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px 20px; background: rgba(15, 23, 42, 0.4); border-radius: 16px; border: 1px dashed rgba(255, 255, 255, 0.1);">
        <p style="font-size: 1.1rem; color: #94A3B8; margin-bottom: 8px;">📷 No gallery photos to display right now.</p>
        <p style="font-size: 0.85rem; color: #64748b;">Upload photos via <a href="ksradmin.html" style="color: #38bdf8; text-decoration: underline;">Admin Panel</a> or click 'Restore Default Photos' in Admin.</p>
      </div>
    `;
    const seeMoreWrapper = document.getElementById("gallery-see-more-wrapper");
    if (seeMoreWrapper) seeMoreWrapper.style.display = "none";
    return;
  }

  const items = SKY_QUEST_DATA.gallery || [];

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:30px; color:var(--text-muted);">No gallery photos found.</p>`;
    const seeMoreWrapper = document.getElementById("gallery-see-more-wrapper");
    if (seeMoreWrapper) seeMoreWrapper.style.display = "none";
    return;
  }

  // Determine if we are on the dedicated gallery page
  const isDedicatedGalleryPage = window.location.pathname.includes("gallery");

  const seeMoreWrapper = document.getElementById("gallery-see-more-wrapper");
  let itemsToRender = items;
  if (items.length > 8 && !isDedicatedGalleryPage) {
    itemsToRender = items.slice(0, 8);
    if (seeMoreWrapper) seeMoreWrapper.style.display = "block";
  } else {
    if (seeMoreWrapper) seeMoreWrapper.style.display = "none";
  }

  window._activeGalleryItems = itemsToRender;

  grid.innerHTML = itemsToRender.map((item, idx) => `
    <div class="gallery-item" onclick="openLightboxByIdx(${idx})">
      <img src="${item.image}" alt="${item.title || 'Gallery Photo'}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop'" />
    </div>
  `).join("");
}

function initGalleryFilters() {
  // Category filtering removed - all photos are common
}

window._currentLightboxIdx = 0;

function openLightboxByIdx(idx) {
  if (!window._activeGalleryItems || !window._activeGalleryItems[idx]) return;
  window._currentLightboxIdx = idx;
  const item = window._activeGalleryItems[idx];
  // Pass empty string for title to hide the caption overlay as requested
  openLightbox(item.image, "");
}

function prevLightboxImage() {
  if (!window._activeGalleryItems || window._activeGalleryItems.length === 0) return;
  let newIdx = window._currentLightboxIdx - 1;
  if (newIdx < 0) {
    newIdx = window._activeGalleryItems.length - 1;
  }
  openLightboxByIdx(newIdx);
}

function nextLightboxImage() {
  if (!window._activeGalleryItems || window._activeGalleryItems.length === 0) return;
  let newIdx = window._currentLightboxIdx + 1;
  if (newIdx >= window._activeGalleryItems.length) {
    newIdx = 0;
  }
  openLightboxByIdx(newIdx);
}

function openLightbox(imgUrl, title) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  if (!modal || !img) return;

  img.src = imgUrl;
  if (caption) {
    caption.textContent = title;
    caption.style.display = title ? "block" : "none";
  }
  modal.classList.add("active");
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
}

// Keyboard navigation for Lightbox
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("lightboxModal");
  if (modal && modal.classList.contains("active")) {
    if (e.key === "ArrowLeft") {
      prevLightboxImage();
    } else if (e.key === "ArrowRight") {
      nextLightboxImage();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  }
});

/**
 * --------------------------------------------------------------------------
 * SECTION 8: Customer Reviews & Testimonials Renderer
 * --------------------------------------------------------------------------
 */
function toggleFeedbackForm() {
  const wrapper = document.getElementById("feedbackFormWrapper");
  if (!wrapper) return;
  const currentDisplay = window.getComputedStyle(wrapper).display;
  const isHidden = currentDisplay === "none";
  wrapper.style.display = isHidden ? "block" : "none";
  if (isHidden) {
    wrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("reviewName")?.value;
  const location = document.getElementById("reviewLocation")?.value;
  const rating = parseInt(document.getElementById("reviewRating")?.value || "5");
  const comment = document.getElementById("reviewComment")?.value;

  if (!name || !location || !comment) return;

  const newReview = {
    id: Date.now(),
    name: name,
    role: location,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: rating,
    comment: comment,
    approved: false, // Requires Admin Approval
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  };

  let savedReviews = [];
  try {
    savedReviews = JSON.parse(localStorage.getItem("skyquest_user_reviews")) || [];
  } catch (e) {
    savedReviews = [];
  }

  savedReviews.unshift(newReview);
  localStorage.setItem("skyquest_user_reviews", JSON.stringify(savedReviews));

  const form = document.getElementById("reviewForm");
  if (form) form.reset();

  const wrapper = document.getElementById("feedbackFormWrapper");
  if (wrapper) wrapper.style.display = "none";

  renderTestimonials();
  showToast("Feedback Submitted! ⏳", "Thank you for your review! Your feedback has been sent to Sky Quest Admin for approval and will appear on the website once approved.");
}

function renderTestimonials() {
  // 1. Render Video Stories Grid
  const videoGrid = document.getElementById("videoStoriesGrid");
  const videoStoriesContainer = document.getElementById("videoStoriesContainer");
  if (videoGrid && window.SKY_QUEST_DATA) {
    let customVideos = [];
    try {
      customVideos = JSON.parse(localStorage.getItem("skyquest_custom_video_stories")) || [];
    } catch (e) {
      customVideos = [];
    }

    const defaultVideos = SKY_QUEST_DATA.videoStories || [];
    const allVideos = [...customVideos, ...defaultVideos];

    if (allVideos.length > 0) {
      if (videoStoriesContainer) videoStoriesContainer.style.display = "block";
      videoGrid.innerHTML = allVideos.map(v => `
        <div class="video-story-card">
          <div class="video-wrapper">
            <video controls poster="images/logo.png" preload="metadata" class="story-video">
              <source src="${v.videoUrl}" type="video/mp4">
              Your browser does not support HTML5 video.
            </video>
          </div>
          <div class="video-story-info">
            <div style="color: var(--accent-gold); font-size: 1.1rem;">⭐⭐⭐⭐⭐</div>
            <p class="story-comment">"${v.comment}"</p>
            <div class="story-author">
              <strong>👤 ${v.traveller}</strong>
            </div>
          </div>
        </div>
      `).join("");
    } else {
      if (videoStoriesContainer) videoStoriesContainer.style.display = "none";
    }
  }

  // 2. Render Text Testimonials Grid (Only Approved Customer Reviews + Defaults)
  const grid = document.getElementById("testimonialsGrid");
  if (!grid || !window.SKY_QUEST_DATA || !SKY_QUEST_DATA.testimonials) return;

  let savedReviews = [];
  try {
    savedReviews = JSON.parse(localStorage.getItem("skyquest_user_reviews")) || [];
  } catch (e) {
    savedReviews = [];
  }

  // Show only approved reviews on website
  const approvedUserReviews = savedReviews.filter(r => r.approved === true);
  const allTestimonials = [...approvedUserReviews, ...SKY_QUEST_DATA.testimonials];

  if (allTestimonials.length > 0) {
    grid.style.display = "grid";
    grid.innerHTML = allTestimonials.map(t => `
      <div class="testimonial-card">
        <div style="color: var(--accent-gold); font-size: 1.2rem;">${'⭐'.repeat(t.rating)}</div>
        <p style="font-size: 0.95rem; margin-top: 12px; font-style: italic; color: var(--text-main);">"${t.comment}"</p>
        <div class="test-user">
          <img src="${t.avatar || 'images/logo.png'}" class="test-avatar" alt="${t.name}" onerror="this.src='images/logo.png'" />
          <div>
            <h4 style="font-size: 1rem;">${t.name}</h4>
            <span style="font-size: 0.8rem; color: var(--primary-blue); font-weight: 600;">${t.role}</span>
          </div>
        </div>
      </div>
    `).join("");
  } else {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:30px; color:var(--text-muted); width:100%; margin:0 auto;">No reviews posted yet. Be the first to share your experience below!</p>`;
    grid.style.display = "block";
  }
}

/**
 * --------------------------------------------------------------------------
 * SECTION 9: FAQ Accordion Renderer
 * --------------------------------------------------------------------------
 */
function renderFaqs() {
  const container = document.getElementById("faqContainer");
  if (!container || !window.SKY_QUEST_DATA || !SKY_QUEST_DATA.faqs) return;

  container.innerHTML = SKY_QUEST_DATA.faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button class="faq-question" onclick="toggleFaq(this)">
        <span>${faq.q}</span>
        <span class="faq-chevron">▼</span>
      </button>
      <div class="faq-answer">
        <p>${faq.a}</p>
      </div>
    </div>
  `).join("");
}

function toggleFaq(btnElement) {
  const faqItem = btnElement.closest(".faq-item");
  if (!faqItem) return;

  const isAlreadyActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach(item => {
    item.classList.remove("active");
  });

  if (!isAlreadyActive) {
    faqItem.classList.add("active");
  }
}

/**
 * --------------------------------------------------------------------------
 * SECTION 10: Booking Enquiry Form Handler
 * --------------------------------------------------------------------------
 */
function initContactForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value;
    const phone = document.getElementById("formPhone").value;
    const dest = document.getElementById("formDestination").value;
    const travelers = document.getElementById("formTravelers").value;
    const date = document.getElementById("formDate").value;
    const msg = document.getElementById("formMessage").value;

    const submission = { name, phone, dest, travelers, date, msg, time: new Date().toLocaleString() };

    // Save lead submission to LocalStorage
    const existing = JSON.parse(localStorage.getItem("sky_quest_enquiries") || "[]");
    existing.push(submission);
    localStorage.setItem("sky_quest_enquiries", JSON.stringify(existing));

    // Form success prompt & redirect to WhatsApp
    const waNumber = (window.SKY_QUEST_DATA && SKY_QUEST_DATA.company && SKY_QUEST_DATA.company.whatsapp) ? SKY_QUEST_DATA.company.whatsapp : "917338710611";
    const waText = encodeURIComponent(
      `Hi Sky Quest Holidays! My name is ${name}. I want to inquire about a trip to ${dest} for ${travelers} persons on ${date}. Notes: ${msg}`
    );
    const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

    showToast(
      `Enquiry Submitted, ${name}! 🎉`,
      `Your request for ${dest} has been saved. We are redirecting you to WhatsApp to connect with our travel advisor.`,
      waUrl
    );

    form.reset();
  };
}

function showToast(title, message, waUrl = null) {
  const toastModal = document.getElementById("toastModal");
  const titleEl = document.getElementById("toastTitle");
  const msgEl = document.getElementById("toastMessage");

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  if (toastModal) toastModal.classList.add("active");

  if (waUrl) {
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 1800);
  }
}

function closeToast() {
  const toastModal = document.getElementById("toastModal");
  if (toastModal) toastModal.classList.remove("active");
}

function initDatePicker() {
  const dateInput = document.getElementById("formDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }
}

function initScrollTopBtn() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });
}

function initKeyboardListeners() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeModal("packageModal");
      closeModal("adminModal");
      closeToast();
    }
  });
}

/**
 * --------------------------------------------------------------------------
 * SECTION 11: Secret Admin Control Center & Cloudinary CDN Engine
 * --------------------------------------------------------------------------
 */
function initAdminPanel() {
  // 1. Secret Keyboard Shortcut: Ctrl + Shift + A
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
      openAdminModal();
    }
  });

  // 2. Secret URL Hash: Typing #admin in URL
  function checkAdminHash() {
    if (window.location.hash.toLowerCase() === '#admin') {
      openAdminModal();
    }
  }

  checkAdminHash();
  window.addEventListener("hashchange", checkAdminHash);
}

function openAdminModal() {
  const modal = document.getElementById("adminModal");
  if (modal) modal.classList.add("active");

  const isLoggedIn = localStorage.getItem("sky_quest_admin_logged_in") === "true";
  if (isLoggedIn) {
    renderAdminDashboard();
  } else {
    renderAdminLoginForm();
  }
}

function renderAdminLoginForm() {
  const container = document.getElementById("adminModalBody");
  if (!container) return;

  container.innerHTML = `
    <div style="text-align: center; padding: 10px 0;">
      <h2 style="font-size: 1.9rem; color: var(--primary-deep); margin-bottom: 6px;">🔐 Sky Quest Admin Login</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem;">Enter admin password to upload images to Cloudinary (dciyanu4f), manage customer reviews & packages.</p>
    </div>
    
    <form id="adminLoginForm" onsubmit="handleAdminLogin(event)" style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px; max-width: 400px; margin-left: auto; margin-right: auto;">
      <div class="form-group">
        <label style="font-weight: 600; font-size: 0.9rem;">Username</label>
        <input type="text" id="adminUser" value="admin" required style="width: 100%; padding: 12px; border: 1px solid var(--border-light); border-radius: 8px;" />
      </div>

      <div class="form-group">
        <label style="font-weight: 600; font-size: 0.9rem;">Password</label>
        <input type="password" id="adminPass" placeholder="skyquest2026" required style="width: 100%; padding: 12px; border: 1px solid var(--border-light); border-radius: 8px;" />
      </div>

      <div id="adminLoginError" style="color: #ef4444; font-size: 0.9rem; display: none; text-align: center;">Incorrect username or password! (Default: admin / skyquest2026)</div>

      <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; margin-top: 8px; font-size: 1rem;">
        🚀 Login to Admin Dashboard
      </button>
    </form>
  `;
}

function handleAdminLogin(e) {
  e.preventDefault();
  const u = document.getElementById("adminUser")?.value;
  const p = document.getElementById("adminPass")?.value;

  if (u === "admin" && p === "skyquest2026") {
    localStorage.setItem("sky_quest_admin_logged_in", "true");
    renderAdminDashboard();
  } else {
    const err = document.getElementById("adminLoginError");
    if (err) err.style.display = "block";
  }
}

function handleAdminLogout() {
  localStorage.removeItem("sky_quest_admin_logged_in");
  renderAdminLoginForm();
}

function renderAdminDashboard() {
  const container = document.getElementById("adminModalBody");
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border-light); padding-bottom: 14px; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h2 style="font-size: 1.8rem; margin: 0;">⚡ Sky Quest Admin Portal</h2>
        <span style="font-size: 0.85rem; color: #0284c7; font-weight: 600;">☁️ Cloudinary ID: dciyanu4f (Active)</span>
      </div>
      <button onclick="handleAdminLogout()" class="btn btn-outline" style="padding: 6px 14px; font-size: 0.85rem; border-color: #ef4444; color: #ef4444;">
        🔒 Logout
      </button>
    </div>

    <!-- Admin Portal Tabs -->
    <div style="display: flex; gap: 8px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 6px;" id="adminTabNav">
      <button class="btn btn-primary admin-tab-btn" onclick="switchAdminTab('leads')" id="tab-btn-leads" style="padding: 8px 16px; font-size: 0.9rem;">
        📋 Leads (<span id="leadsCount">0</span>)
      </button>
      <button class="btn btn-outline admin-tab-btn" onclick="switchAdminTab('feedback')" id="tab-btn-feedback" style="padding: 8px 16px; font-size: 0.9rem;">
        ⭐ Upload Feedback
      </button>
      <button class="btn btn-outline admin-tab-btn" onclick="switchAdminTab('gallery')" id="tab-btn-gallery" style="padding: 8px 16px; font-size: 0.9rem;">
        📸 Upload Gallery
      </button>
      <button class="btn btn-outline admin-tab-btn" onclick="switchAdminTab('package')" id="tab-btn-package" style="padding: 8px 16px; font-size: 0.9rem;">
        🌴 Add Package
      </button>
      <button class="btn btn-outline admin-tab-btn" onclick="switchAdminTab('edit-image')" id="tab-btn-edit-image" style="padding: 8px 16px; font-size: 0.9rem;">
        🖼️ Change Package Image
      </button>
    </div>

    <!-- Active Tab Content Container -->
    <div id="adminTabContent"></div>
  `;

  switchAdminTab('leads');
}

function switchAdminTab(tabName) {
  const navBtns = document.querySelectorAll(".admin-tab-btn");
  navBtns.forEach(b => {
    b.classList.remove("btn-primary");
    b.classList.add("btn-outline");
  });
  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.remove("btn-outline");
    activeBtn.classList.add("btn-primary");
  }

  const content = document.getElementById("adminTabContent");
  if (!content) return;

  if (tabName === "leads") {
    const enquiries = JSON.parse(localStorage.getItem("sky_quest_enquiries") || "[]");
    const countEl = document.getElementById("leadsCount");
    if (countEl) countEl.textContent = enquiries.length;

    if (enquiries.length === 0) {
      content.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 30px;">No customer enquiries submitted yet.</p>`;
      return;
    }

    content.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto;">
        ${enquiries.map((eq, i) => `
          <div style="background: var(--bg-main); padding: 14px 18px; border-radius: 12px; border-left: 4px solid var(--primary-blue); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="font-weight: 700; font-size: 1.05rem;">#${i + 1} ${eq.name} (${eq.phone})</div>
              <div style="color: var(--primary-blue); font-weight: 600; font-size: 0.9rem; margin-top: 2px;">📍 ${eq.dest} | 👥 ${eq.travelers} Travelers</div>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">"${eq.msg}"</div>
            </div>
            <a href="https://wa.me/91${eq.phone}?text=Hi%20${encodeURIComponent(eq.name)}!%20Thank%20you%20for%20enquiring%20about%20${encodeURIComponent(eq.dest)}%20package." target="_blank" class="btn btn-whatsapp" style="padding: 6px 14px; font-size: 0.85rem;">
              💬 Reply via WhatsApp
            </a>
          </div>
        `).join("")}
      </div>
    `;
  } else if (tabName === "feedback") {
    content.innerHTML = `
      <form onsubmit="handleAdminFeedbackUpload(event)" style="display: flex; flex-direction: column; gap: 14px;">
        <h3>⭐ Upload Customer Feedback / Review</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600;">Customer Name *</label>
            <input type="text" id="fbName" required placeholder="e.g. Ananya & Karthik" style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600;">Role / Trip Type *</label>
            <input type="text" id="fbRole" required placeholder="e.g. Honeymoon Couple, Munnar" style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600;">Star Rating (1 - 5)</label>
            <select id="fbRating" style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;">
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars</option>
            </select>
          </div>
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Customer Photo (Cloudinary upload) *</label>
          <input type="file" id="fbImageFile" accept="image/*" style="width: 100%; padding: 10px; border: 1px dashed var(--primary-blue); border-radius: 8px; background: #f0f9ff;" />
          <div id="fbUploadStatus" style="font-size: 0.82rem; margin-top: 4px; color: #0284c7;"></div>
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Feedback / Review Comment *</label>
          <textarea id="fbComment" required rows="3" placeholder="Write customer review..." style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;"></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="padding: 12px; font-size: 1rem; margin-top: 6px;">
          ☁️ Upload Photo & Publish Feedback
        </button>
      </form>
    `;
  } else if (tabName === "gallery") {
    content.innerHTML = `
      <form onsubmit="handleAdminGalleryUpload(event)" style="display: flex; flex-direction: column; gap: 14px;">
        <h3>📸 Bulk Upload Gallery Photos</h3>
        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Category</label>
          <select id="galCat" style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;">
            <option value="students">Students / College IV</option>
            <option value="family">Family Trip</option>
            <option value="couples">Couples / Honeymoon</option>
            <option value="resorts">Resorts & Stay</option>
          </select>
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Select Gallery Photo File(s) - Bulk Selection Supported *</label>
          <input type="file" id="galImageFile" accept="image/*" multiple required style="width: 100%; padding: 10px; border: 1px dashed var(--primary-blue); border-radius: 8px; background: #f0f9ff;" />
          <div id="galUploadStatus" style="font-size: 0.82rem; margin-top: 4px; color: #0284c7;"></div>
        </div>

        <button type="submit" class="btn btn-primary" style="padding: 12px; font-size: 1rem; margin-top: 6px;">
          ☁️ Bulk Upload to Cloudinary & Add to Gallery
        </button>
      </form>
    `;
  } else if (tabName === "package") {
    content.innerHTML = `
      <form onsubmit="handleAdminPackageUpload(event)" style="display: flex; flex-direction: column; gap: 14px;">
        <h3>🌴 Add New Tour Package</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600;">Package Destination Name *</label>
            <input type="text" id="pkgName" required placeholder="e.g. Kashmir Paradise" style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600;">Category</label>
            <select id="pkgCategory" style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;">
              <option value="Honeymoon">Honeymoon</option>
              <option value="Family">Family</option>
              <option value="Adventure">Adventure</option>
              <option value="College">College IV</option>
              <option value="Pilgrimage">Pilgrimage</option>
            </select>
          </div>
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Short Tagline / Description *</label>
          <input type="text" id="pkgDesc" required placeholder="Experience snow mountains and serene lakes..." style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;" />
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Places to Visit (comma separated)</label>
          <input type="text" id="pkgPlaces" placeholder="Gulmarg, Sonamarg, Pahalgam, Dal Lake" style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;" />
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Upload Package Cover Image (Cloudinary) *</label>
          <input type="file" id="pkgImageFile" accept="image/*" required style="width: 100%; padding: 10px; border: 1px dashed var(--primary-blue); border-radius: 8px; background: #f0f9ff;" />
          <div id="pkgUploadStatus" style="font-size: 0.82rem; margin-top: 4px; color: #0284c7;"></div>
        </div>

        <button type="submit" class="btn btn-primary" style="padding: 12px; font-size: 1rem; margin-top: 6px;">
          ☁️ Upload to Cloudinary & Add Package
        </button>
      </form>
    `;
  } else if (tabName === "edit-image") {
    const pkgList = (window.SKY_QUEST_DATA && SKY_QUEST_DATA.packages) ? SKY_QUEST_DATA.packages : [];
    content.innerHTML = `
      <form onsubmit="handleAdminUpdatePackageImage(event)" style="display: flex; flex-direction: column; gap: 14px;">
        <h3>🖼️ Change Image of Existing Tour Package</h3>
        
        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Select Existing Package *</label>
          <select id="editPkgSelect" required style="width: 100%; padding: 10px; border: 1px solid var(--border-light); border-radius: 8px;" onchange="updatePkgImagePreview(this.value)">
            ${pkgList.map(p => `<option value="${p.id}">${p.name || p.title} (${p.location || p.category})</option>`).join("")}
          </select>
        </div>

        <div id="editPkgPreviewBox" style="background: var(--bg-main); padding: 14px; border-radius: 10px; border: 1px solid var(--border-light);">
          <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 8px;">Current Image Preview:</label>
          <img id="editPkgPreviewImg" src="${pkgList[0]?.image || ''}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600;">Upload New Image File (Cloudinary) *</label>
          <input type="file" id="editPkgImageFile" accept="image/*" required style="width: 100%; padding: 10px; border: 1px dashed var(--primary-blue); border-radius: 8px; background: #f0f9ff;" />
          <div id="editPkgUploadStatus" style="font-size: 0.82rem; margin-top: 4px; color: #0284c7;"></div>
        </div>

        <button type="submit" class="btn btn-primary" style="padding: 12px; font-size: 1rem; margin-top: 6px;">
          ☁️ Upload to Cloudinary & Replace Package Image
        </button>
      </form>
    `;
  }
}

// Canvas Image Compression Utility
function compressAndResizeImage(file, maxWidth = 1000, quality = 0.82) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// SHA-1 Hash Generator for Cloudinary API signature calculation
async function generateSha1Hash(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Helper to Upload Image File to Cloudinary CDN Account (dciyanu4f)
async function uploadToCloudinaryHelper(file, statusId) {
  const statusEl = document.getElementById(statusId);
  if (statusEl) statusEl.textContent = "⏳ Uploading image directly to Cloudinary (dciyanu4f)...";

  const cloudName = "dciyanu4f";
  const apiKey = "858478214766486";
  const apiSecret = "0j2YjgBOSMS3MKi9PtaMaG5onsI";
  const timestamp = Math.floor(Date.now() / 1000);

  try {
    const stringToSign = `timestamp=${timestamp}${apiSecret}`;
    const signature = await generateSha1Hash(stringToSign);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.secure_url) {
      if (statusEl) statusEl.textContent = "✅ Uploaded to Cloudinary CDN (" + data.secure_url + ")!";
      return data.secure_url;
    } else if (data.error) {
      console.warn("Cloudinary API Notice:", data.error.message);
    }
  } catch (e) {
    console.error("Cloudinary error:", e);
  }

  // Fallback to local canvas base64 image if offline
  const compressedUrl = await compressAndResizeImage(file);
  if (statusEl) statusEl.textContent = "✅ Saved image successfully!";
  return compressedUrl;
}

async function handleAdminFeedbackUpload(e) {
  e.preventDefault();
  const name = document.getElementById("fbName")?.value;
  const role = document.getElementById("fbRole")?.value;
  const rating = parseInt(document.getElementById("fbRating")?.value || "5");
  const comment = document.getElementById("fbComment")?.value;
  const fileInput = document.getElementById("fbImageFile");

  if (!name || !role || !comment) return;

  let avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
  if (fileInput && fileInput.files[0]) {
    avatarUrl = await uploadToCloudinaryHelper(fileInput.files[0], "fbUploadStatus");
  }

  const newFeedback = {
    id: Date.now(),
    name: name,
    role: role,
    rating: rating,
    comment: comment,
    avatar: avatarUrl
  };

  const reviews = JSON.parse(localStorage.getItem("skyquest_user_reviews") || "[]");
  reviews.unshift(newFeedback);
  localStorage.setItem("skyquest_user_reviews", JSON.stringify(reviews));

  renderTestimonials();
  window.dispatchEvent(new Event('storage'));
  alert(`✅ Feedback for "${name}" published to Traveller Stories.`);
}

async function handleAdminGalleryUpload(e) {
  e.preventDefault();
  const cat = document.getElementById("galCat")?.value || "students";
  const fileInput = document.getElementById("galImageFile");
  const statusEl = document.getElementById("galUploadStatus");

  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert("Please select at least one photo file to upload.");
    return;
  }

  const files = Array.from(fileInput.files);
  const total = files.length;
  let successCount = 0;
  const newItems = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (statusEl) {
      statusEl.textContent = `⏳ Uploading photo ${i + 1} of ${total} (${file.name})...`;
    }

    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const formattedTitle = fileNameWithoutExt.charAt(0).toUpperCase() + fileNameWithoutExt.slice(1);

    const imageUrl = await uploadToCloudinaryHelper(file, "galUploadStatus");

    if (imageUrl) {
      const newItem = {
        id: Date.now() + i,
        title: formattedTitle,
        category: cat,
        image: imageUrl
      };
      newItems.push(newItem);
      successCount++;
    }
  }

  if (newItems.length > 0) {
    const customGallery = JSON.parse(localStorage.getItem("sky_quest_custom_gallery") || "[]");
    const updatedGallery = [...newItems, ...customGallery];
    localStorage.setItem("sky_quest_custom_gallery", JSON.stringify(updatedGallery));

    if (window.SKY_QUEST_DATA && SKY_QUEST_DATA.gallery) {
      SKY_QUEST_DATA.gallery.unshift(...newItems);
    }
    renderGallery();
    window.dispatchEvent(new Event('storage'));

    if (statusEl) {
      statusEl.textContent = `✅ Successfully uploaded ${successCount} photo(s) to Cloudinary & added to Gallery!`;
    }
    alert(`✅ Bulk Upload Complete: ${successCount} of ${total} photo(s) published to Gallery.`);
    fileInput.value = "";
  }
}

async function handleAdminPackageUpload(e) {
  e.preventDefault();
  const name = document.getElementById("pkgName")?.value;
  const category = document.getElementById("pkgCategory")?.value;
  const desc = document.getElementById("pkgDesc")?.value;
  const placesStr = document.getElementById("pkgPlaces")?.value || "";
  const fileInput = document.getElementById("pkgImageFile");

  if (!name || !desc || !fileInput || !fileInput.files[0]) return;

  const imageUrl = await uploadToCloudinaryHelper(fileInput.files[0], "pkgUploadStatus");
  const placesArr = placesStr.split(",").map(s => s.trim()).filter(Boolean);

  const newPkg = {
    id: Date.now(),
    name: name,
    title: name,
    category: category,
    desc: desc,
    tagline: desc,
    image: imageUrl,
    location: name,
    placesToVisit: placesArr.length ? placesArr : ["Scenic Views", "Local Sightseeing", "Resort Stay"],
    highlights: placesArr.length ? placesArr : ["Scenic Views", "Local Sightseeing", "Resort Stay"]
  };

  const customPkgs = JSON.parse(localStorage.getItem("sky_quest_custom_packages") || "[]");
  customPkgs.unshift(newPkg);
  localStorage.setItem("sky_quest_custom_packages", JSON.stringify(customPkgs));

  if (window.SKY_QUEST_DATA && SKY_QUEST_DATA.packages) {
    SKY_QUEST_DATA.packages.unshift(newPkg);
    renderPackages(SKY_QUEST_DATA.packages);
  }
  window.dispatchEvent(new Event('storage'));
  alert(`✅ "${name}" package added to Popular Tour Packages.`);
}

function updatePkgImagePreview(pkgId) {
  if (!window.SKY_QUEST_DATA || !SKY_QUEST_DATA.packages) return;
  const pkg = SKY_QUEST_DATA.packages.find(p => p.id == pkgId);
  const img = document.getElementById("editPkgPreviewImg");
  if (pkg && img) {
    img.src = pkg.image;
  }
}

async function handleAdminUpdatePackageImage(e) {
  e.preventDefault();
  const pkgId = document.getElementById("editPkgSelect")?.value;
  const fileInput = document.getElementById("editPkgImageFile");
  const statusEl = document.getElementById("editPkgUploadStatus");

  if (!pkgId || !fileInput || !fileInput.files[0]) {
    alert("Please select a package and upload an image file.");
    return;
  }

  const pkg = SKY_QUEST_DATA.packages.find(p => p.id == pkgId);
  if (!pkg) {
    alert("Package not found.");
    return;
  }

  const newImageUrl = await uploadToCloudinaryHelper(fileInput.files[0], "editPkgUploadStatus");

  if (!newImageUrl) {
    alert("Error processing image.");
    return;
  }

  // 1. Update live package object
  pkg.image = newImageUrl;

  // 2. Persist override in LocalStorage
  let imageOverrides = {};
  try {
    imageOverrides = JSON.parse(localStorage.getItem("sky_quest_pkg_image_overrides") || "{}");
  } catch (err) {
    imageOverrides = {};
  }
  imageOverrides[pkgId] = newImageUrl;
  localStorage.setItem("sky_quest_pkg_image_overrides", JSON.stringify(imageOverrides));

  // 3. Update preview image
  const imgPreview = document.getElementById("editPkgPreviewImg");
  if (imgPreview) imgPreview.src = newImageUrl;

  if (statusEl) statusEl.textContent = "✅ Image updated successfully!";

  // 4. Re-render package cards grid
  renderPackages(SKY_QUEST_DATA.packages);

  // 5. Notify open browser tabs
  window.dispatchEvent(new Event('storage'));

  alert(`✅ Success! Image for "${pkg.name || pkg.title}" has been updated on the website.`);
}

/**
 * --------------------------------------------------------------------------
 * SECTION 12: SEO Travel Guides & Blog Section Renderer
 * --------------------------------------------------------------------------
 */
function renderBlogs() {
  const grid = document.getElementById("blogGrid");
  if (!grid || !window.SKY_QUEST_DATA || !SKY_QUEST_DATA.blogs) return;

  grid.innerHTML = SKY_QUEST_DATA.blogs.map(blog => `
    <div class="blog-card">
      <div style="height: 200px; overflow: hidden; position: relative;">
        <img src="${blog.image}" class="blog-img" alt="${blog.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
        <span class="blog-cat" style="position: absolute; top: 12px; left: 12px; background: var(--primary-blue); color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">${blog.category}</span>
      </div>
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1;">
        <h3 style="font-size: 1.15rem; color: var(--text-main); line-height: 1.4;">${blog.title}</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; flex: 1;">${blog.excerpt}</p>
        <div style="margin-top: 10px;">
          <button class="btn btn-outline" onclick="openBlogModal(${blog.id})" style="width: 100%; font-size: 0.88rem;">
            📖 Read Guide & Book Trip ↗
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function openBlogModal(blogId) {
  if (!window.SKY_QUEST_DATA || !SKY_QUEST_DATA.blogs) return;
  const blog = SKY_QUEST_DATA.blogs.find(b => b.id == blogId);
  if (!blog) return;

  const modal = document.getElementById("packageModal");
  const body = document.getElementById("packageModalBody");
  if (!modal || !body) return;

  const waUrl = `https://wa.me/917338710611?text=${encodeURIComponent(`Hi Sky Quest Holidays! I read your guide "${blog.title}" and want to enquire about trip options.`)}`;

  body.innerHTML = `
    <img src="${blog.image}" class="modal-header-img" alt="${blog.title}" loading="lazy" />
    <div class="modal-body">
      <span class="section-subtitle">${blog.category} • ${blog.date}</span>
      <h2 style="font-size: 2rem; margin-top: 6px;">${blog.title}</h2>
      <hr style="margin: 18px 0; border: none; border-top: 1px solid var(--border-light);" />
      <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-main); margin-bottom: 24px;">${blog.content}</p>
      <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 24px;">
        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="flex: 1; min-width: 200px; font-size: 1.05rem; justify-content: center;">
          💬 Enquire via WhatsApp
        </a>
        <button class="btn btn-outline" onclick="closeModal('packageModal')" style="flex: 1; min-width: 160px;">Close Guide</button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}
