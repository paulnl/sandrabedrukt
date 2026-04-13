/* ========================================
   SandraBedrukt - Scripts
   ======================================== */

// Smooth scroll voor anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// SEO: Track outbound affiliate clicks (optioneel)
document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
  link.addEventListener('click', function() {
    // Optioneel: tracking code toevoegen hier
    // console.log('Affiliate click:', this.href);
  });
});

console.log('SandraBedrukt loaded');