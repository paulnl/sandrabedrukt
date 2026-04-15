// SandraBedrukt Scripts

// Category ID naar HTML mapping
const categoryLinks = {
  'kraamcadeau': 'kraamcadeau-met-naam.html',
  'mok': 'mok-met-naam.html',
  'foto': 'cadeau-met-foto.html',
  'budget': 'goedkope-gepersonaliseerde-cadeaus.html'
};

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



// === FAQ LADEN UIT JSON ===
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


// === CATEGORIEËN LADEN UIT JSON ===
async function loadCategories() {
  const grid = document.getElementById('cat-grid');
  if (!grid) return;
  
  try {
    const response = await fetch('products.json');
    const data = await response.json();
    
    if (!data.categories || data.categories.length === 0) return;
    
    grid.innerHTML = data.categories.map(cat => `
      <a href="${categoryLinks[cat.id] || cat.id + '.html'}" class="cat-card">
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
      </a>
    `).join('');
    
  } catch (error) {
    console.error('Categorieën laden mislukt:', error);
  }
}


// Start
document.addEventListener('DOMContentLoaded', function() {
  loadCategories();
  loadProducts();
  loadFAQ();
});

console.log('SandraBedrukt loaded');
