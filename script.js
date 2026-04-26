/**
 * script.js — Portfolio of Harsh Ujala
 * Handles: active nav, mobile hamburger, scroll animations,
 *          form validation, back-to-top, dynamic year in footer
 */

// ─────────────────────────────────────────────────────────────────
// 1. ACTIVE NAVIGATION LINK (dynamic — based on current URL)
// ─────────────────────────────────────────────────────────────────
(function setActiveNav() {
  var navLinks    = document.querySelectorAll('.sidebar-nav a');
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentFile) {
      link.classList.add('active');
    }
  });
})();


// ─────────────────────────────────────────────────────────────────
// 2. MOBILE HAMBURGER MENU
// ─────────────────────────────────────────────────────────────────
var hamburger = document.getElementById('hamburger');
var sidebar   = document.querySelector('.sidebar');

if (hamburger && sidebar) {
  hamburger.addEventListener('click', function () {
    sidebar.classList.toggle('open');
    hamburger.classList.toggle('is-open');
  });

  // Close sidebar when any nav link is clicked (mobile UX)
  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      sidebar.classList.remove('open');
      hamburger.classList.remove('is-open');
    });
  });
}


// ─────────────────────────────────────────────────────────────────
// 3. BACK TO TOP BUTTON — shows after scrolling 400px
// ─────────────────────────────────────────────────────────────────
var backTopBtn = document.querySelector('.back-top');

if (backTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backTopBtn.classList.add('visible');
    } else {
      backTopBtn.classList.remove('visible');
    }
  });

  backTopBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ─────────────────────────────────────────────────────────────────
// 4. SCROLL-TRIGGERED FADE-UP ANIMATIONS (IntersectionObserver)
// ─────────────────────────────────────────────────────────────────
var fadeElements = document.querySelectorAll('.fade-up');

if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
  var scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // Stagger each element by 80ms for a cascade effect
        setTimeout(function () {
          entry.target.classList.add('in');
        }, index * 80);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeElements.forEach(function (el) {
    scrollObserver.observe(el);
  });
}


// ─────────────────────────────────────────────────────────────────
// 5. CONTACT FORM — VALIDATION + LOCALSTORAGE SUBMISSION
// ─────────────────────────────────────────────────────────────────
var contactForm = document.getElementById('contact-form');

if (contactForm) {

  // Helper: display an inline error message under a field
  function showFieldError(fieldId, message) {
    var field    = document.getElementById(fieldId);
    var existing = document.getElementById(fieldId + '-error');
    if (existing) existing.remove();

    var errorEl       = document.createElement('span');
    errorEl.id        = fieldId + '-error';
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
    field.classList.add('input-error');
  }

  // Helper: remove error state from a field
  function clearFieldError(fieldId) {
    var field    = document.getElementById(fieldId);
    var existing = document.getElementById(fieldId + '-error');
    if (existing) existing.remove();
    if (field)    field.classList.remove('input-error');
  }

  // Helper: validate email using a regular expression
  function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  // Clear errors in real-time as the user types
  ['full-name', 'email', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () {
        clearFieldError(id);
      });
    }
  });

  // Main form submit handler
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop the page from reloading

    // Read all field values
    var fullName = document.getElementById('full-name').value.trim();
    var email    = document.getElementById('email').value.trim();
    var subject  = document.getElementById('subject').value.trim();
    var message  = document.getElementById('message').value.trim();

    // Clear any previous error messages
    clearFieldError('full-name');
    clearFieldError('email');
    clearFieldError('message');

    // Run all validation checks
    var formIsValid = true;

    if (fullName === '') {
      showFieldError('full-name', 'Please enter your full name.');
      formIsValid = false;
    } else if (fullName.length < 2) {
      showFieldError('full-name', 'Name must be at least 2 characters.');
      formIsValid = false;
    }

    if (email === '') {
      showFieldError('email', 'Email address is required.');
      formIsValid = false;
    } else if (!isValidEmail(email)) {
      showFieldError('email', 'Please enter a valid email (e.g. name@example.com).');
      formIsValid = false;
    }

    if (message === '') {
      showFieldError('message', 'Please write your message before submitting.');
      formIsValid = false;
    } else if (message.length < 10) {
      showFieldError('message', 'Message is too short. Please provide more detail.');
      formIsValid = false;
    }

    // Do not proceed if validation failed
    if (!formIsValid) return;

    // Build the submission object
    var submission = {
      id:      Date.now(),
      name:    fullName,
      email:   email,
      subject: subject !== '' ? subject : '(No subject)',
      message: message,
      date:    new Date().toLocaleString()
    };

    // Retrieve existing messages and append the new one
    var savedMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    savedMessages.push(submission);
    localStorage.setItem('portfolioMessages', JSON.stringify(savedMessages));

    // Show success message via DOM manipulation
    var successEl = document.getElementById('form-success');
    if (successEl) {
      successEl.textContent = 'Thank you, ' + fullName + '! Your message has been received. I\'ll get back to you soon.';
      successEl.style.display = 'block';

      // Auto-hide the success message after 6 seconds
      setTimeout(function () {
        successEl.style.display = 'none';
      }, 6000);
    }

    // Reset the form fields
    contactForm.reset();
  });
}


// ─────────────────────────────────────────────────────────────────
// 6. DYNAMIC COPYRIGHT YEAR (auto-updates every year)
// ─────────────────────────────────────────────────────────────────
var yearSpans = document.querySelectorAll('.footer-year');
var thisYear  = new Date().getFullYear();
yearSpans.forEach(function (el) {
  el.textContent = thisYear;
});


// ─────────────────────────────────────────────────────────────────
// 7. SMOOTH SCROLL FOR IN-PAGE ANCHOR LINKS
// ─────────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var targetId = link.getAttribute('href');
    if (targetId === '#') return; // Back-to-top handled separately
    var targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
