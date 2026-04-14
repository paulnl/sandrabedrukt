// SandraBedrukt Scripts

// Smooth scroll voor anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Track outbound clicks (optioneel)
document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
  link.addEventListener('click', function() {
    // Analytics tracking hier toevoegen indien gewenst
  });
});

// FAQ laden uit JSON
async function loadFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;
  
  try {
    const response = await fetch('faq.json');
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

// Start
document.addEventListener('DOMContentLoaded', loadFAQ);

console.log('SandraBedrukt loaded');