document.addEventListener("DOMContentLoaded", function () {
  let sidebar = document.querySelector(".sidebar");
  let overlay = document.querySelector(".overlay");
  let hamburger = document.querySelector(".hamburger");

  if (sidebar && overlay && hamburger) {
      function toggleMenu() {
          sidebar.classList.toggle("active");
          overlay.classList.toggle("active");
      }

      hamburger.addEventListener("click", toggleMenu);
      overlay.addEventListener("click", toggleMenu);

      // Close menu when clicking outside
      document.addEventListener("click", function (event) {
          if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
              sidebar.classList.remove("active");
              overlay.classList.remove("active");
          }
      });
  } else {
      console.warn("Sidebar, overlay, or hamburger not found. Ensure they exist in your HTML.");
  }

  // Logout Confirmation
  let logoutBtn = document.querySelector("a[href='#'][onclick*='confirmLogout']");
  if (logoutBtn) {
      logoutBtn.addEventListener("click", function (event) {
          event.preventDefault();
          if (confirm("Are you sure you want to logout?")) {
              window.location.href = "start.html";
          }
      });
  }
});
