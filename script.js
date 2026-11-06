/**
 * ============================================================================
 * NeatNest Home Care - Master Client-Side Script
 * Portfolio Demonstration & Interactive Frontend Functionality
 * ============================================================================
 */

'use strict';

/* ----------------------------------------------------------------------------
   1. Central Site & WhatsApp Configuration
   Change this single configuration object to adapt for a real business client.
   ---------------------------------------------------------------------------- */
const SITE_CONFIG = {
  businessName: 'NeatNest Home Care',
  
  /**
   * WhatsApp Configuration:
   * Use an international country code without '+' or special characters.
   * Default placeholder: '91XXXXXXXXXX' (India code + placeholder).
   * Example for a live client in India: '919876543210'
   * Example for a live client in the US: '14155552671'
   * Example for a live client in the UK: '447911123456'
   */
  whatsappNumber: '91XXXXXXXXXX',

  /**
   * Prefilled inquiry text when launching WhatsApp chat
   */
  defaultWhatsAppMessage: 'Hello NeatNest Home Care! I would like to request an estimate for residential cleaning services for my home.',

  /**
   * Flag indicating this is currently running as a portfolio demonstration
   */
  isDemoMode: true
};

/* ----------------------------------------------------------------------------
   2. DOM Ready Initialization
   ---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initServiceSelectButtons();
  initWhatsAppIntegration();
  initEstimateForm();
  initFAQAccordion();
  initBackToTop();
  initNavScrollSpy();
});

/* ----------------------------------------------------------------------------
   3. Sticky Header Elevation
   ---------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ----------------------------------------------------------------------------
   4. Mobile Navigation Drawer (Accessible, Focus-Trapped, Escape Key)
   ---------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-menu');
  const closeBtn = document.getElementById('mobile-nav-close');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = drawer ? drawer.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta') : [];

  if (!toggleBtn || !drawer) return;

  let isMenuOpen = false;

  const openMenu = () => {
    isMenuOpen = true;
    drawer.classList.add('is-open');
    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus close button or first interactive link
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  };

  const closeMenu = (restoreFocus = true) => {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    drawer.classList.remove('is-open');
    drawer.setAttribute('inert', '');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (restoreFocus) {
      toggleBtn.focus();
    }
  };

  toggleBtn.addEventListener('click', () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeMenu(true));
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => closeMenu(true));
  }

  // Close when clicking any nav anchor
  navLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu(false));
  });

  // Keyboard accessibility: Escape key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu(true);
    }
  });
}

/* ----------------------------------------------------------------------------
   5. WhatsApp Integration Logic
   Checks for placeholder and offers instructional feedback or launches wa.me
   ---------------------------------------------------------------------------- */
function isWhatsAppNumberValid(numberStr) {
  if (!numberStr || typeof numberStr !== 'string') return false;
  // Strip whitespace, plus, dashes, parentheses
  const cleaned = numberStr.replace(/[^0-9a-zA-Z]/g, '');
  // If contains placeholder 'X' or 'x', or is shorter than 10 digits
  if (/x/i.test(cleaned) || cleaned.length < 10) return false;
  // Must be only digits
  return /^\d{10,15}$/.test(cleaned);
}

function initWhatsAppIntegration() {
  const whatsappBtn = document.getElementById('whatsapp-cta-btn');
  const dialog = document.getElementById('whatsapp-dialog');
  const dialogCloseBtn = document.getElementById('dialog-close-btn');
  const dialogCancelBtn = document.getElementById('dialog-cancel-btn');
  const dialogGotoContact = document.getElementById('dialog-goto-contact');
  const phoneDisplay = document.getElementById('demo-phone-display');

  if (!whatsappBtn) return;

  // Update visible phone display with formatted value if configured
  if (phoneDisplay && SITE_CONFIG.whatsappNumber) {
    phoneDisplay.textContent = `+${SITE_CONFIG.whatsappNumber}`;
  }

  const openWhatsAppDialog = () => {
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else if (dialog) {
      // Fallback for older browsers
      dialog.setAttribute('open', '');
    } else {
      alert(`WhatsApp Demo Notice:\nThe current number (${SITE_CONFIG.whatsappNumber}) is a demo placeholder.\nTo configure for a live client, update the 'whatsappNumber' in script.js.`);
    }
  };

  const closeWhatsAppDialog = () => {
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    } else if (dialog) {
      dialog.removeAttribute('open');
    }
    whatsappBtn.focus();
  };

  whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (isWhatsAppNumberValid(SITE_CONFIG.whatsappNumber)) {
      // Configured with a real phone number
      const cleanNumber = SITE_CONFIG.whatsappNumber.replace(/\D/g, '');
      const encodedMsg = encodeURIComponent(SITE_CONFIG.defaultWhatsAppMessage);
      const url = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Still set to demo placeholder: display educational modal
      openWhatsAppDialog();
    }
  });

  if (dialogCloseBtn) dialogCloseBtn.addEventListener('click', closeWhatsAppDialog);
  if (dialogCancelBtn) dialogCancelBtn.addEventListener('click', closeWhatsAppDialog);
  
  if (dialogGotoContact) {
    dialogGotoContact.addEventListener('click', () => {
      closeWhatsAppDialog();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Close dialog on clicking outside backdrop
  if (dialog) {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeWhatsAppDialog();
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   6. Service Card Enquire Buttons (Preselect Dropdown & Smooth Scroll)
   ---------------------------------------------------------------------------- */
function initServiceSelectButtons() {
  const serviceButtons = document.querySelectorAll('.select-service-btn, .footer-service-link');
  const serviceSelect = document.getElementById('contact-service');
  const contactSection = document.getElementById('contact');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetService = btn.getAttribute('data-service');
      if (targetService && serviceSelect) {
        serviceSelect.value = targetService;
        // Trigger change event for validation styling
        serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Smoothly focus the select dropdown after scrolling
        setTimeout(() => {
          if (serviceSelect) serviceSelect.focus();
        }, 600);
      }
    });
  });
}

/* ----------------------------------------------------------------------------
   7. Contact & Estimate Form Validation (Accessible, Demo Truthful)
   ---------------------------------------------------------------------------- */
function initEstimateForm() {
  const form = document.getElementById('quote-form');
  const feedbackBox = document.getElementById('form-demo-feedback');
  const previewDataList = document.getElementById('demo-preview-data');
  const resetBtn = document.getElementById('reset-demo-form-btn');
  const liveStatus = document.getElementById('form-live-status');

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('error-name'),
      validate: (val) => val.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).'
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('error-email'),
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val.trim()) ? '' : 'Please enter a valid email address (e.g., name@example.com).';
      }
    },
    phone: {
      input: document.getElementById('contact-phone'),
      error: document.getElementById('error-phone'),
      validate: (val) => {
        if (!val.trim()) return ''; // Phone is optional
        const phoneRegex = /^[\d\s+\-()]{7,20}$/;
        return phoneRegex.test(val.trim()) ? '' : 'Please enter a valid phone number or leave blank.';
      }
    },
    service: {
      input: document.getElementById('contact-service'),
      error: document.getElementById('error-service'),
      validate: (val) => val ? '' : 'Please choose a service from the list.'
    },
    homeSize: {
      input: document.getElementById('contact-home-size'),
      error: document.getElementById('error-home-size'),
      validate: (val) => val ? '' : 'Please select your approximate home layout.'
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('error-message'),
      validate: (val) => val.trim().length >= 10 ? '' : 'Please provide details on your home or priority areas (at least 10 characters).'
    }
  };

  // Helper to validate a single field
  const validateField = (key) => {
    const item = fields[key];
    if (!item || !item.input) return true;

    const errorMsg = item.validate(item.input.value);
    if (errorMsg) {
      item.input.classList.add('is-invalid');
      item.input.setAttribute('aria-invalid', 'true');
      if (item.error) {
        item.error.textContent = errorMsg;
        item.error.classList.add('visible');
        item.input.setAttribute('aria-describedby', item.error.id);
      }
      return false;
    } else {
      item.input.classList.remove('is-invalid');
      item.input.removeAttribute('aria-invalid');
      if (item.error) {
        item.error.textContent = '';
        item.error.classList.remove('visible');
        item.input.removeAttribute('aria-describedby');
      }
      return true;
    }
  };

  // Attach live validation on blur and input after first blur
  Object.keys(fields).forEach(key => {
    const item = fields[key];
    if (!item || !item.input) return;

    item.input.addEventListener('blur', () => validateField(key));
    item.input.addEventListener('input', () => {
      if (item.input.classList.contains('is-invalid')) {
        validateField(key);
      }
    });
    if (item.input.tagName === 'SELECT') {
      item.input.addEventListener('change', () => validateField(key));
    }
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    Object.keys(fields).forEach(key => {
      const valid = validateField(key);
      if (!valid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = fields[key].input;
        }
      }
    });

    if (!isFormValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      if (liveStatus) {
        liveStatus.textContent = 'Form validation failed. Please check the highlighted fields above.';
      }
      return;
    }

    // Form is completely valid on client side
    // Display Honest Portfolio Demo Confirmation Box
    const serviceLabels = {
      'regular': 'Regular Home Cleaning',
      'deep': 'Deep Cleaning Service',
      'move': 'Move-In / Move-Out Cleaning',
      'kitchen-bath': 'Kitchen & Bathroom Detail',
      'general': 'General Enquiry / Custom Checklist'
    };

    const homeSizeLabels = {
      '1-2-bed': '1 - 2 Bedrooms (Apartment/Condo)',
      '3-4-bed': '3 - 4 Bedrooms (Single Family Home)',
      '5-plus-bed': '5+ Bedrooms / Multi-level Home',
      'studio': 'Compact Studio'
    };

    const capturedData = {
      'Full Name': fields.name.input.value.trim(),
      'Email': fields.email.input.value.trim(),
      'Phone': fields.phone.input.value.trim() || 'Not specified',
      'Service Requested': serviceLabels[fields.service.input.value] || fields.service.input.value,
      'Home Size': homeSizeLabels[fields.homeSize.input.value] || fields.homeSize.input.value,
      'Message / Scope': fields.message.input.value.trim()
    };

    // Populate data preview
    if (previewDataList) {
      previewDataList.innerHTML = '';
      Object.entries(capturedData).forEach(([label, value]) => {
        const dt = document.createElement('dt');
        dt.textContent = `${label}:`;
        const dd = document.createElement('dd');
        dd.textContent = value;
        previewDataList.appendChild(dt);
        previewDataList.appendChild(dd);
      });
    }

    // Transition form to feedback box
    form.style.display = 'none';
    if (feedbackBox) {
      feedbackBox.hidden = false;
      feedbackBox.setAttribute('aria-hidden', 'false');
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      feedbackBox.focus();
    }

    if (liveStatus) {
      liveStatus.textContent = 'Estimate enquiry validated successfully in portfolio demonstration mode.';
    }
  });

  // Reset Button handling
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      Object.keys(fields).forEach(key => {
        const item = fields[key];
        if (item.input) {
          item.input.classList.remove('is-invalid');
          item.input.removeAttribute('aria-invalid');
          item.input.removeAttribute('aria-describedby');
        }
        if (item.error) {
          item.error.textContent = '';
          item.error.classList.remove('visible');
        }
      });

      if (feedbackBox) {
        feedbackBox.hidden = true;
        feedbackBox.setAttribute('aria-hidden', 'true');
      }

      form.style.display = 'flex';
      form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      fields.name.input.focus();

      if (liveStatus) {
        liveStatus.textContent = 'Form has been reset.';
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   8. FAQ Accordion Single-Open Enhancement
   ---------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('#faq-accordion details');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.open) {
            otherItem.open = false;
          }
        });
      }
    });
  });
}

/* ----------------------------------------------------------------------------
   9. Back to Top Button
   ---------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Set focus to skip link or header for keyboard accessibility
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) skipLink.focus();
  });
}

/* ----------------------------------------------------------------------------
   10. Scroll Spy for Desktop Navigation Link Highlighting
   ---------------------------------------------------------------------------- */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id="hero"]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  if (!sections.length || !desktopLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}
