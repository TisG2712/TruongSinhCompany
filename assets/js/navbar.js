// Mobile Menu Toggle Functionality
let mobileMenuInitialized = false;

function initMobileMenu() {
  // Prevent multiple initializations
  if (mobileMenuInitialized) {
    return;
  }

  // Get elements
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const closeBtn = document.getElementById("close-btn");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarDropdowns = document.querySelectorAll(".sidebar-dropdown");
  const sidebarHotlineBtn = document.querySelector(".sidebar-hotline-btn");

  // Check if elements exist
  if (!hamburgerBtn || !mobileSidebar) {
    return;
  }

  mobileMenuInitialized = true;

  // Toggle sidebar function
  function toggleSidebar() {
    if (mobileSidebar) {
      mobileSidebar.classList.toggle("active");
      // Prevent body scroll when sidebar is open
      if (mobileSidebar.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }

  // Close sidebar function
  function closeSidebar() {
    if (mobileSidebar) {
      mobileSidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Event listeners
  hamburgerBtn.addEventListener("click", toggleSidebar);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // Handle sidebar dropdowns - click on arrow to toggle
  sidebarDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".sidebar-dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent any default behavior
        e.stopPropagation(); // Prevent event bubbling
        dropdown.classList.toggle("active");
      });
    }
  });

  // Close sidebar when clicking on a link
  const sidebarLinks = document.querySelectorAll(
    ".sidebar-link, .sidebar-dropdown-item"
  );
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Add a small delay to allow navigation
      setTimeout(closeSidebar, 100);
    });
  });

  // Handle hotline button click
  if (sidebarHotlineBtn) {
    sidebarHotlineBtn.addEventListener("click", function () {
      // You can add phone call functionality here
      window.location.href = "tel:0975258999";
      // Close sidebar after a short delay
      setTimeout(closeSidebar, 500);
    });
  }

  // Close sidebar on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileSidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && mobileSidebar.classList.contains("active")) {
      closeSidebar();
    }
  });
}

// Desktop Dropdown Functionality
function initDesktopDropdown() {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    const dropdown = toggle.closest(".dropdown");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    const arrow = toggle.querySelector(".dropdown-arrow");

    // Click on text - navigate to page
    toggle.addEventListener("click", function (e) {
      // If clicking on arrow, don't navigate
      if (e.target === arrow || arrow.contains(e.target)) {
        e.preventDefault();
        return;
      }

      // Navigate to the href
      const href = toggle.getAttribute("href");
      if (href) {
        window.location.href = href;
      }
    });

    // Click on arrow - toggle dropdown
    if (arrow) {
      arrow.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Close other dropdowns
        document.querySelectorAll(".dropdown").forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("active");
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("active");
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });
}

// Initialize mobile menu when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initMobileMenu, 100);
  setTimeout(initDesktopDropdown, 100);
});

// Backup initialization when window loads
window.addEventListener("load", function () {
  setTimeout(initMobileMenu, 200);
  setTimeout(initDesktopDropdown, 200);
});
