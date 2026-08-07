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

  // ============================================
  // HERO GREETING TYPEWRITER
  // Types "hello" in different languages, deletes it,
  // then moves to the next. Respects reduced-motion.
  // ============================================
  (function heroGreetingTypewriter() {
    const el = document.getElementById('heroGreeting');
    if (!el) return;

    const greetings = [
      'Hello',        // English
      '你好',          // Chinese
      'こんにちは',      // Japanese
      '안녕하세요',       // Korean
      'Привет',        // Russian
      'Hallo',         // German
      'Bonjour',       // French
      'Hola',          // Spanish
      'Olá',           // Portuguese
      'नमस्ते',          // Hindi
      'Ndewo',         // Igbo
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      el.textContent = greetings[0];
      return;
    }

    const TYPE_SPEED = 110;
    const DELETE_SPEED = 55;
    const HOLD_AFTER_TYPE = 1400;
    const HOLD_AFTER_DELETE = 300;

    let greetingIndex = 0;
    let charIndex = 0;

    function type() {
      const current = greetings[greetingIndex];

      if (charIndex <= current.length) {
        el.textContent = current.slice(0, charIndex);
        charIndex++;
        setTimeout(type, TYPE_SPEED);
      } else {
        setTimeout(erase, HOLD_AFTER_TYPE);
      }
    }

    function erase() {
      const current = greetings[greetingIndex];

      if (charIndex >= 0) {
        el.textContent = current.slice(0, charIndex);
        charIndex--;
        setTimeout(erase, DELETE_SPEED);
      } else {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        charIndex = 0;
        setTimeout(type, HOLD_AFTER_DELETE);
      }
    }

    type();
  })();