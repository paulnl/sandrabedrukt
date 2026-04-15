// Categorie Snippet Loader
// Laadt HTML snippets uit categorie folders in bestaande contentblokken

const categoryMap = {
  "mok-met-naam.html": "categorieen/mok-met-naam/",
  "kraamcadeau-met-naam.html": "categorieen/kraamcadeau-met-naam/",
  "cadeau-met-foto.html": "categorieen/cadeau-met-foto/",
  "goedkope-gepersonaliseerde-cadeaus.html": "categorieen/goedkope-cadeaus/"
};

const categoryFiles = {
  "categorieen/mok-met-naam/": ["bol-mokmetnaam01.html"],
  "categorieen/kraamcadeau-met-naam/": ["test.html"],
  "categorieen/cadeau-met-foto/": ["test.html"],
  "categorieen/goedkope-cadeaus/": ["bol-mok-01.html"]
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

  const grid = document.querySelector('.gift-grid');
  if (!grid) return;

  for (const file of files) {
    try {
      const res = await fetch('/' + category + file);
      if (res.ok) {
        const html = await res.text();
        const wrapper = document.createElement('div');
        wrapper.className = 'snippet-card';
        wrapper.innerHTML = html;
        grid.appendChild(wrapper);
      }
    } catch (e) {
      console.log('Snippet laden mislukt:', file);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadSnippets);
