// Categorie Snippet Loader
// Laadt HTML snippets uit categorie folders in bestaande contentblokken

const categoryMap = {
  "mok-met-naam.html": "categorieen/mok-met-na m/",
  "kraamcadeau-met-naam.html": "categorieen/kraamcadeau-met-na m/",
  "cadeau-met-foto.html": "categorieen/cadeau-met-foto/",
  "goedkope-gepersonaliseerde-cadeaus.html": "categorieen/goedkope-cadeaus/"
};

// Bekende bestanden per categorie (hardcoded omdat folder listing niet werkt op GitHub Pages)
const categoryFiles = {
  "categorieen/mok-met-na m/": ["test.html"],
  "categorieen/kraamcadeau-met-na m/": ["test.html"],
  "categorieen/cadeau-met-foto/": ["test.html"],
  "categorieen/goedkope-cadeaus/": ["test.html"]
};

function getCategoryForPage() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  return categoryMap[page] || null;
}

async function loadSnippets() {
  const category = getCategoryForPage();
  if (!category) return;

  const files = categoryFiles[category];
  if (!files) return;

  // Zoek de gift-grid container
  const grid = document.querySelector('.gift-grid');
  if (!grid) return;

  // Verwijder bestaande placeholder content
  const existingCards = grid.querySelectorAll('.gift-card');
  if (existingCards.length > 0) {
    // Bewaar eerste kaart als template, verwijer de rest straks na laden
  }

  // Laad snippets
  for (const file of files) {
    try {
      const res = await fetch('/' + category + file);
      if (res.ok) {
        const html = await res.text();
        
        // Maak wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'gift-card';
        wrapper.innerHTML = html;
        
        grid.appendChild(wrapper);
      }
    } catch (e) {
      console.log('Snippet laden mislukt:', file);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadSnippets);