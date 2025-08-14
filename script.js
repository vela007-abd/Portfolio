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

