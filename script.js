/* ==========================================================================
   CORAZÓN SOLAR - JUDY BENTOLILA ISHACOSMICA
   Interactive Scripts & Cosmic Visual Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cosmic Canvas Engine (Starfield & Quantum Glow)
  initCosmicCanvas();

  // 2. Navigation Header & Mobile Menu
  initNavigation();

  // 3. FAQ Accordion Engine
  initFAQAccordion();

  // 4. Booking Modal & Virtual Coffee Engine
  initCoffeeBookingModal();

  // 5. Smooth Scroll links
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Cosmic Canvas Engine
   -------------------------------------------------------------------------- */
function initCosmicCanvas() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    stars = [];
    const count = Math.floor((width * height) / 3500);
    
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.3,
        alpha: Math.random(),
        baseAlpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.015 + 0.005,
        color: Math.random() > 0.85 ? '#E6C57B' : (Math.random() > 0.7 ? '#F0ABFC' : '#FFFFFF')
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
      // Twinkle effect
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0.2) {
        star.speed = -star.speed;
      }

      // Mouse influence
      let starX = star.x;
      let starY = star.y;
      
      if (mouse.x && mouse.y) {
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          starX -= (dx / dist) * force * 15;
          starY -= (dy / dist) * force * 15;
        }
      }

      ctx.beginPath();
      ctx.arc(starX, starY, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      ctx.shadowBlur = star.size > 1.2 ? 8 : 0;
      ctx.shadowColor = star.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Navigation Header & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.header-nav');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. FAQ Accordion Engine
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
}

/* --------------------------------------------------------------------------
   4. Booking Modal & Virtual Coffee Engine
   -------------------------------------------------------------------------- */
function initCoffeeBookingModal() {
  const backdrop = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('[data-open-modal="booking"]');
  const bookingForm = document.getElementById('coffee-form');
  const previewBox = document.getElementById('email-preview-box');

  // Set minimum date to today
  const dateInput = document.getElementById('coffee-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  function openModal() {
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop?.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('user-name')?.value || 'Alma Radiante';
      const email = document.getElementById('user-email')?.value || 'tu@correo.com';
      const date = document.getElementById('coffee-date')?.value || 'Próximo día disponible';
      const time = document.getElementById('coffee-time')?.value || '17:00 HRS';

      if (previewBox) {
        previewBox.innerHTML = `
          <div style="color: #E6C57B; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-circle-check" style="color: #10B981;"></i> ¡Cita Confirmada con Éxito!
          </div>
          <p style="font-size: 0.9rem; color: #FFFFFF; margin-bottom: 12px;">
            Hemos reservado tu espacio sagrado con Judy. Se ha generado una confirmación automática enviada a: <strong style="color:#F0ABFC;">${email}</strong>
          </p>
          <div style="background: rgba(18, 11, 29, 0.9); padding: 16px; border-radius: 12px; border: 1px solid rgba(230, 197, 123, 0.3); font-size: 0.85rem; color: #B8B0C8;">
            <div style="font-weight: 700; color: #E6C57B; margin-bottom: 4px;"><i class="fa-solid fa-envelope-open-text" style="margin-right: 6px;"></i> VISTA PREVIA DEL CORREO DE CONFIRMACIÓN:</div>
            <hr style="border: 0; border-top: 1px solid rgba(230, 197, 123, 0.2); margin: 8px 0;" />
            <p><strong>Asunto:</strong> <i class="fa-solid fa-star" style="color: var(--gold-primary); margin-right: 4px;"></i> Tu Café Virtual con Judy Bentolila está reservado - Corazón Solar</p>
            <br/>
            <p>Hola <strong>${name}</strong>,</p>
            <p>¡Qué alegría conectar contigo! Tu café virtual ha sido agendado para el <strong>${date} a las ${time}</strong>.</p>
            <p>En este espacio sin juzgamientos ni prisas, escucharemos lo que tu alma necesita para disolver bloqueos y activar tu claridad cuántica.</p>
            <p style="margin-top: 8px;">Un abrazo de luz y nos vemos muy pronto,<br/><strong style="color: #E6C57B;">Judy Bentolila - Ishacosmica</strong></p>
          </div>
        `;
        previewBox.classList.add('active');
        bookingForm.reset();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. Smooth Scroll
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
