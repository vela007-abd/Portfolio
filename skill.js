const toggleBtn = document.getElementById('theme-toggle');

function updateThemeIcon() {
  toggleBtn.textContent = document.body.classList.contains('night') ? '☀️' : '🌙';
}

function setDayNightClass(isNight) {
  if (isNight) {
    document.body.classList.add('night');
    document.body.classList.remove('day');
  } else {
    document.body.classList.add('day');
    document.body.classList.remove('night');
  }
  updateThemeIcon();
}

toggleBtn.addEventListener('click', () => {
  const isNight = !document.body.classList.contains('night');
  setDayNightClass(isNight);
  try {
    localStorage.setItem('preferred-theme', isNight ? 'night' : 'day');
  } catch {}
});

// Load saved theme or default to day
window.addEventListener('DOMContentLoaded', () => {
  try {
    const storedTheme = localStorage.getItem('preferred-theme');
    if (storedTheme === 'night') {
      setDayNightClass(true);
    } else {
      setDayNightClass(false);
    }
  } catch {
    setDayNightClass(false);
  }
});

// Certificate modal logic
const modal = document.getElementById("cert-modal");
const modalImg = document.getElementById("cert-modal-img");
const closeBtn = document.querySelector(".close");

// Open modal on certificate click
document.querySelectorAll(".certificate").forEach(cert => {
  cert.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = cert.src;
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal on click outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

