function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');

    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  }

  // Load saved theme on page load
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Priority: saved preference > system preference > light mode default
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.remove('light-mode');
      themeToggle.textContent = '🌙';
    } else {
      document.body.classList.add('light-mode');
      themeToggle.textContent = '☀️';
    }

    // Add click listener to theme toggle
    themeToggle.addEventListener('click', toggleTheme);
  });

  function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
  }

  function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth'
    });

    // Close mobile menu
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');

    // Update active state
    document.querySelectorAll('.nav-links button').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });