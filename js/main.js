/**
 * Shiv Shakti Industry - Main JavaScript
 * Clean, well-organized functionality for the website
 */

// ============================================================================
// CONFIGURATION
// ============================================================================
const WHATSAPP_NUMBER = '918825212613';
const GALLERY_DATA = [
  {
    assetKey: 'factoryMachine',
    title: 'Hydraulic Automatic Brick Press Machine',
    caption: 'Subhadra Enterprises automated hydraulic machine producing precision fly ash bricks in our Telo plant.'
  },
  {
    assetKey: 'factoryFleetYard',
    title: 'Logistics Transportation Fleet & Plant Yard',
    caption: 'Commercial Tata trucks and tippers parked in our plant yard at night, ready for scheduled site dispatches.'
  },
  {
    assetKey: 'factoryMachine',
    title: 'High Compressive Density Conveyor Feed',
    caption: 'Uniform compaction and sharp edge finish guaranteed by automated hydraulic pressure.'
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function isMobile() {
  return window.innerWidth <= 768;
}

function encodeText(text) {
  return encodeURIComponent(text);
}

function scrollToElement(element, behavior = 'smooth', block = 'center') {
  element.scrollIntoView({ behavior, block });
}

// ============================================================================
// 1. MOBILE MENU
// ============================================================================
const MobileMenu = {
  hamburgerBtn: null,
  mobileDrawer: null,

  init() {
    this.hamburgerBtn = document.getElementById('hamburgerBtn');
    this.mobileDrawer = document.getElementById('mobileDrawer');

    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener('click', () => this.toggle());
    }

    document.addEventListener('click', (e) => this.handleClickOutside(e));
  },

  toggle() {
    this.mobileDrawer.classList.toggle('open');
  },

  close() {
    this.mobileDrawer.classList.remove('open');
  },

  handleClickOutside(e) {
    if (
      this.mobileDrawer &&
      !this.mobileDrawer.contains(e.target) &&
      this.hamburgerBtn &&
      !this.hamburgerBtn.contains(e.target) &&
      this.mobileDrawer.classList.contains('open')
    ) {
      this.close();
    }
  }
};

// ============================================================================
// 2. NAVBAR & SCROLL TO TOP
// ============================================================================
const Navbar = {
  navbar: null,
  scrollTopBtn: null,

  init() {
    this.navbar = document.getElementById('navbar');
    this.scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => this.handleScroll());

    if (this.scrollTopBtn) {
      this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());
    }
  },

  handleScroll() {
    if (this.navbar) {
      this.navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (this.scrollTopBtn) {
      this.scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  },

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// ============================================================================
// 3. PRODUCT FILTER
// ============================================================================
function filterProducts(category, btnElement) {
  const tabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-card');

  // Update active tab
  tabs.forEach(tab => tab.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    tabs.forEach(tab => {
      if (tab.textContent.toLowerCase().includes(category.toLowerCase())) {
        tab.classList.add('active');
      }
    });
  }

  // Filter products
  products.forEach(product => {
    const matchesCategory = category === 'all' || product.getAttribute('data-category') === category;
    product.style.display = matchesCategory ? 'flex' : 'none';
  });
}

// ============================================================================
// 4. MODALS
// ============================================================================
const QuoteModal = {
  overlay: null,

  init() {
    this.overlay = document.getElementById('quoteModalOverlay');
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
    }
  },

  open(productName = '') {
    if (productName) {
      this.setSelectValue('modalProduct', productName);
    }
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  },

  setSelectValue(selectId, value) {
    const select = document.getElementById(selectId);
    if (!select) return;

    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.toLowerCase().includes(value.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }
};

function openQuoteModal(productName = '') {
  QuoteModal.open(productName);
}

function closeQuoteModal() {
  QuoteModal.close();
}

function enquireProduct(prodName) {
  QuoteModal.setSelectValue('clientProduct', prodName);
  QuoteModal.open(prodName);
}

// ============================================================================
// 5. FORM HANDLING & WHATSAPP
// ============================================================================
const WhatsAppFormatter = {
  send(data, template) {
    const text = this.buildMessage(data, template);
    const encoded = encodeText(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  },

  buildMessage(data, template) {
    let message = `*Shiv Shakti Industry - ${template}*\n\n`;
    message += `*Name:* ${data.name}\n`;
    message += `*Phone:* ${data.phone}\n`;

    if (data.company) message += `*Company:* ${data.company}\n`;
    if (data.email) message += `*Email:* ${data.email}\n`;

    message += `*Product Required:* ${data.product || 'Construction Materials'}\n`;
    if (data.quantity) message += `*Quantity:* ${data.quantity}\n`;
    message += `*Delivery Location:* ${data.location || 'Bokaro / Jharkhand'}\n`;

    if (data.message) message += `*Message:* ${data.message}\n`;

    return message;
  }
};

function handleFormSubmit(e) {
  e.preventDefault();

  const successAlert = document.getElementById('formAlertSuccess');
  if (successAlert) {
    successAlert.style.display = 'block';
    scrollToElement(successAlert);
    document.getElementById('quoteForm').reset();

    setTimeout(() => {
      successAlert.style.display = 'none';
    }, 7000);
  }
}

function handleModalFormSubmit(e) {
  e.preventDefault();
  alert('Thank you! Your quote request has been received. Our team will contact you shortly.');
  closeQuoteModal();
  document.getElementById('modalQuoteForm').reset();
}

function sendFormToWhatsApp() {
  const data = {
    name: document.getElementById('clientName').value.trim() || 'Client',
    phone: document.getElementById('clientPhone').value.trim() || 'Not specified',
    email: document.getElementById('clientEmail').value.trim(),
    company: document.getElementById('clientCompany').value.trim(),
    product: document.getElementById('clientProduct').value,
    quantity: document.getElementById('clientQuantity').value.trim(),
    location: document.getElementById('clientLocation').value.trim(),
    message: document.getElementById('clientMessage').value.trim()
  };

  WhatsAppFormatter.send(data, 'New Material Inquiry');
}

function sendModalToWhatsApp() {
  const data = {
    name: document.getElementById('modalName').value.trim() || 'Client',
    phone: document.getElementById('modalPhone').value.trim() || 'Not specified',
    product: document.getElementById('modalProduct').value,
    location: document.getElementById('modalLocation').value.trim(),
    quantity: document.getElementById('modalQuantity').value.trim()
  };

  WhatsAppFormatter.send(data, 'Quote Request');
  closeQuoteModal();
}

// ============================================================================
// 6. GALLERY LIGHTBOX
// ============================================================================
const Lightbox = {
  modal: null,
  img: null,
  caption: null,
  currentIndex: 0,

  init() {
    this.modal = document.getElementById('lightboxModal');
    this.img = document.getElementById('lightboxImg');
    this.caption = document.getElementById('lightboxCaption');

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  },

  open(idx) {
    this.currentIndex = idx;
    this.updateContent();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  },

  change(dir) {
    this.currentIndex = (this.currentIndex + dir + GALLERY_DATA.length) % GALLERY_DATA.length;
    this.updateContent();
  },

  updateContent() {
    const item = GALLERY_DATA[this.currentIndex];
    if (typeof EMBEDDED_ASSETS !== 'undefined') {
      this.img.src = EMBEDDED_ASSETS[item.assetKey] || item.src;
    }
    this.img.alt = item.title;
    this.caption.innerHTML = `
      <strong>${item.title}</strong><br>
      <span style="font-size:0.85rem; color:#cbd5e1;">${item.caption}</span>
    `;
  },

  handleKeydown(e) {
    if (this.modal && this.modal.classList.contains('active')) {
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.change(-1);
      if (e.key === 'ArrowRight') this.change(1);
    }
  }
};

function openLightbox(idx) {
  Lightbox.open(idx);
}

function closeLightbox() {
  Lightbox.close();
}

function changeLightbox(dir) {
  Lightbox.change(dir);
}

// ============================================================================
// 7. SHOW MORE FUNCTIONALITY
// ============================================================================
const ShowMore = {
  sections: [
    {
      gridId: 'productsGrid',
      buttonId: 'productsShowMore',
      cardClass: '.product-card',
      mobileLimit: 3
    },
    {
      gridId: 'testimonialsTrack',
      buttonId: 'testimonialsShowMore',
      cardClass: '.testimonial-card',
      mobileLimit: 2,
      navSelector: '.testimonials-nav'
    },
    {
      gridId: 'servicesGrid',
      buttonId: 'servicesShowMore',
      cardClass: '.service-card',
      mobileLimit: 2
    }
  ],

  init() {
    this.sections.forEach(section => this.setupSection(section));
  },

  setupSection(config) {
    const grid = document.getElementById(config.gridId);
    const button = document.getElementById(config.buttonId);
    if (!grid || !button) return;

    const cards = grid.querySelectorAll(config.cardClass);
    const mobile = isMobile();
    const showCount = mobile ? config.mobileLimit : cards.length;

    cards.forEach((card, index) => {
      card.style.display = (index >= showCount && mobile) ? 'none' : '';
    });

    button.style.display = (cards.length > showCount && mobile) ? 'flex' : 'none';

    // Handle navigation visibility for testimonials
    if (config.navSelector) {
      const nav = document.querySelector(config.navSelector);
      if (nav) {
        nav.style.display = (cards.length > showCount && mobile) ? 'none' : '';
      }
    }

    button.onclick = () => {
      cards.forEach(card => card.style.display = '');
      button.style.display = 'none';
      if (config.navSelector) {
        const nav = document.querySelector(config.navSelector);
        if (nav) nav.style.display = '';
      }
    };
  }
};

// ============================================================================
// 8. TESTIMONIALS SLIDER
// ============================================================================
const TestimonialsSlider = {
  track: null,
  cards: [],
  dotsContainer: null,
  prevBtn: null,
  nextBtn: null,
  currentIndex: 0,
  perView: 3,
  autoSlideInterval: null,

  init() {
    this.track = document.getElementById('testimonialsTrack');
    this.dotsContainer = document.getElementById('testimonialDots');
    this.prevBtn = document.getElementById('testimonialPrev');
    this.nextBtn = document.getElementById('testimonialNext');
    this.cards = document.querySelectorAll('.testimonial-card');

    if (!this.track || this.cards.length === 0) return;

    this.updatePerView();
    this.initDots();
    this.bindEvents();
    this.startAutoSlide();
  },

  updatePerView() {
    if (window.innerWidth <= 768) {
      this.perView = 1;
    } else if (window.innerWidth <= 1024) {
      this.perView = 2;
    } else {
      this.perView = 3;
    }
  },

  initDots() {
    this.dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(this.cards.length / this.perView);

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('testimonial-dot');
      if (i === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.update();
      });

      this.dotsContainer.appendChild(dot);
    }
  },

  update() {
    const cardWidth = this.cards[0].offsetWidth + 24;
    this.track.style.transform = `translateX(-${this.currentIndex * cardWidth * this.perView}px)`;

    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  },

  getMaxIndex() {
    return Math.ceil(this.cards.length / this.perView) - 1;
  },

  goToPrev() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.getMaxIndex();
    this.update();
  },

  goToNext() {
    this.currentIndex = this.currentIndex < this.getMaxIndex() ? this.currentIndex + 1 : 0;
    this.update();
  },

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.goToPrev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToNext());
    }

    window.addEventListener('resize', () => {
      this.updatePerView();
      this.initDots();
      this.update();
    });
  },

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => this.goToNext(), 5000);
  },

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
};

// ============================================================================
// 9. PAGE TRANSITIONS
// ============================================================================
const PageTransitions = {
  init() {
    // Add fade-in class to main content sections
    const sections = document.querySelectorAll('section, .hero-section');
    sections.forEach(section => {
      section.classList.add('fade-in-section');
    });

    // Observe sections for intersection
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach(section => observer.observe(section));
    } else {
      // Fallback: show all sections immediately
      sections.forEach(section => section.classList.add('visible'));
    }
  }
};

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  MobileMenu.init();
  Navbar.init();
  QuoteModal.init();
  Lightbox.init();
  ShowMore.init();
  TestimonialsSlider.init();
  PageTransitions.init();
});
