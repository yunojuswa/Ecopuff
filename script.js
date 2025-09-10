document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // SIDEBAR FUNCTIONALITY
  // ==============================
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sidebar = document.getElementById("sidebar");

  if (menuBtn && closeBtn && sidebar) {
    // Save sidebar open/close state to localStorage
    function saveSidebarState(isOpen) {
      localStorage.setItem("sidebarOpen", isOpen ? "true" : "false");
      localStorage.setItem("sidebarInteracted", "true");
    }

    // Open sidebar
    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
      menuBtn.classList.add("hidden");
      saveSidebarState(true);
    });

    // Close sidebar
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
      menuBtn.classList.remove("hidden");
      saveSidebarState(false);
    });

    // Close sidebar when clicking outside
    setTimeout(() => {
      document.addEventListener("click", (e) => {
        if (
          sidebar.classList.contains("active") &&
          !sidebar.contains(e.target) &&
          !menuBtn.contains(e.target) &&
          !closeBtn.contains(e.target)
        ) {
          sidebar.classList.remove("active");
          menuBtn.classList.remove("hidden");
          saveSidebarState(false);
        }
      });
    }, 300);

    // Restore sidebar state on page load
    const wasOpen = localStorage.getItem("sidebarOpen") === "true";
    if (wasOpen) {
      sidebar.classList.add("active");
      menuBtn.classList.add("hidden");
    } else {
      sidebar.classList.remove("active");
      menuBtn.classList.remove("hidden");
    }

    // Restore open submenu state
    const openIndexes = JSON.parse(localStorage.getItem('sidebarOpenSubmenus') || '[]');
    const sidebarLis = document.querySelectorAll('#sidebar nav ul > li');
    openIndexes.forEach(i => {
      if (sidebarLis[i]) sidebarLis[i].classList.add('open');
    });
  }
});

// ==============================
// BOTTOM PROMPT FUNCTIONALITY
// ==============================
const nextPagePrompt = document.getElementById("nextPagePrompt");
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0.9) {
    nextPagePrompt.style.display = "block";
  }
});

// ==============================
// EMOJI RAIN BACKGROUND EFFECT (with easter egg)
// ==============================
function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  // Easter egg: 1/500 chance for a special emoji
  if (Math.random() < 0.002) {
    emoji.textContent = "😜";
    emoji.title = "You found the secret emoji!";
  } else {
    emoji.textContent = "♻";
  }
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = (15 + Math.random() * 20) + "s";
  emoji.style.fontSize = (2 + Math.random() * 5) + "rem";
  emoji.style.opacity = 0.3 + Math.random() * 0.3;
  document.querySelector(".emoji-rain").appendChild(emoji);
  setTimeout(() => {
    emoji.remove();
  }, 30000);
}

// ==============================
// CLOUD BACKGROUND EFFECT (with easter egg)
// ==============================
function createCloud() {
  const cloud = document.createElement("img");
  const isDarkMode = document.body.classList.contains("dark-mode");
  // Easter egg: 1/200 chance for UFO
  if (Math.random() < 0.005) {
    cloud.src = "pictures/GLOBAL/bg sprites/ufo.webp";
    cloud.title = "You found the secret cloud!";
  } else if (isDarkMode) {
    cloud.src = "pictures/GLOBAL/bg sprites/darkcloud.png";
  } else {
    cloud.src = "pictures/GLOBAL/bg sprites/cloud.png";
  }
  cloud.classList.add("cloud");
  // Position clouds below header
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  const windowHeight = window.innerHeight;
  const minTop = headerHeight;
  const maxTop = windowHeight * 0.6;
  cloud.style.top = (minTop + Math.random() * (maxTop - minTop)) + "px";
  const size = 80 + Math.random() * 200;
  cloud.style.width = size + "px";
  const duration = 20 + Math.random() * 30;
  cloud.style.animationDuration = duration + "s";
  document.querySelector(".clouds").appendChild(cloud);
  setTimeout(() => {
    cloud.remove();
  }, duration * 1000);
}

// Start emoji rain effect
function startEmojiRain() {
  setInterval(createEmoji, 300);
}

// Start clouds effect
function startClouds() {
  setInterval(createCloud, 4000);
  for (let i = 0; i < 3; i++) {
    setTimeout(createCloud, i * 1000);
  }
}

// Randomly choose between emoji rain or clouds on page load
window.onload = () => {
  if (Math.random() < 0.5) {
    startEmojiRain();
  } else {
    startClouds();
  }
};

// ==============================
// TOGGLE ANIMATION FUNCTIONALITY
// ==============================
const toggleBtn = document.getElementById("toggleAnimationBtn");
const bgCover = document.getElementById("bgCover");

function isAnimationEnabled() {
  return localStorage.getItem("animationEnabled") !== "false";
}

function applyAnimationState(enabled) {
  if (enabled) {
    bgCover.style.display = "none";
    if (toggleBtn) toggleBtn.textContent = "Disable Animation";
    localStorage.setItem("animationEnabled", "true");
  } else {
    bgCover.style.display = "block";
    if (toggleBtn) toggleBtn.textContent = "Enable Animation";
    localStorage.setItem("animationEnabled", "false");
  }
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const enabled = isAnimationEnabled();
    applyAnimationState(!enabled);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const enabled = isAnimationEnabled();
  applyAnimationState(enabled);
});

// ==============================
// DARK MODE FUNCTIONALITY
// ==============================
const darkModeBtn = document.getElementById("toggleDarkModeBtn");
const darkModeIcon = document.getElementById("darkModeIcon");

function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    darkModeIcon.src = "pictures/GLOBAL/sun.svg";
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark-mode");
    darkModeIcon.src = "pictures/GLOBAL/moon.svg";
    localStorage.setItem("darkMode", "false");
  }
  updateCloudSprites();
}

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    const isDark = localStorage.getItem("darkMode") === "true";
    applyDarkMode(!isDark);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  applyDarkMode(isDark);
});

// ==============================
// SIDEBAR NESTED MENU FUNCTIONALITY
// ==============================
document.querySelectorAll('#sidebar nav ul > li > a').forEach((parentLink, idx) => {
  parentLink.addEventListener('click', function(e) {
    const submenu = this.nextElementSibling;
    if (submenu && submenu.classList.contains('submenu')) {
      e.preventDefault();
      this.parentElement.classList.toggle('open');
      // Save open submenu index to localStorage
      const openIndexes = Array.from(document.querySelectorAll('#sidebar nav ul > li'))
        .map((li, i) => li.classList.contains('open') ? i : null)
        .filter(i => i !== null);
      localStorage.setItem('sidebarOpenSubmenus', JSON.stringify(openIndexes));
    }
  });
});

// ==============================
// SEGMENT REVEAL ON HASH NAVIGATION
// ==============================
const hash = window.location.hash;
if (hash.startsWith("#segment-")) {
  const targetSegment = document.getElementById(hash.substring(1));
  if (targetSegment) {
    const segments = Array.from(document.querySelectorAll('.segment'));
    segments.forEach(seg => seg.classList.remove('visible'));
    const targetIndex = segments.indexOf(targetSegment);
    for (let i = 0; i <= targetIndex; i++) {
      segments[i].classList.add('visible');
    }
    // Scroll with offset for fixed header
    setTimeout(() => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const segmentTop = targetSegment.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: segmentTop - headerHeight - 40,
        behavior: 'smooth'
      });
    }, 100);
  }
}

// ==============================
// UPDATE CLOUD SPRITES BASED ON DARK MODE
// ==============================
function updateCloudSprites() {
  const isDarkMode = document.body.classList.contains("dark-mode");
  document.querySelectorAll('.cloud').forEach(cloud => {
    // Skip easter egg clouds (like UFO)
    if (cloud.title === "You found the secret cloud!") return;
    cloud.src = isDarkMode
      ? "pictures/GLOBAL/bg sprites/darkcloud.png"
      : "pictures/GLOBAL/bg sprites/cloud.png";
  });
}

// Initial cloud sprite update
updateCloudSprites();






