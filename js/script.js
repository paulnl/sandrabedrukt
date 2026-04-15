// SandraBedrukt Scripts

// Category ID naar HTML mapping
const categoryLinks = {
  kraamcadeau: 'kraamcadeau-met-naam.html',
  mok: 'mok-met-naam.html',
  foto: 'cadeau-met-foto.html',
  budget: 'goedkope-gepersonaliseerde-cadeaus.html'
};

// Smooth scroll voor anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Track outbound clicks (optioneel)
document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
  link.addEventListener('click', function () {
    // Analytics tracking hier toevoegen indien gewenst
  });
});

// === FAQ LADEN UIT JSON ===
async function loadFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  try {
    const response = await fetch('./faq.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (!data.faq || data.faq.length === 0) return;

    container.innerHTML = data.faq.map(item => `
      <details>
        <summary>${item.question}</summary>
        <p>${item.answer}</p>
      </details>
    `).join('');
  } catch (error) {
    console.error('FAQ laden mislukt:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFAQ();
});

console.log('SandraBedrukt loaded');
