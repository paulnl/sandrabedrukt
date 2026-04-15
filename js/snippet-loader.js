// Categorie Snippet Loader
// Laadt HTML snippets uit categorie folders in bestaande contentblokken (max 10 per pagina)

const categoryMap = {
  "mok-met-name.html": "categorieen/mok-met-na m/",
  "kraamcadeau-met-name.html": "categorieen/kraamcadeau-met-na m/",
  "cadeau-met-foto.html": "categorieen/cadeau-met-foto/",
  "goedkope-gepersonaliseerde-cadeaus.html": "categorieen/goedkope-cadeaus/"
};

const MAX_ITEMS = 10;

async function loadSnippets() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const categoryPath = categoryMap[page];
  if (!categoryPath) {
    console.log('Snippet loader: Geen mapping voor pagina:', page);
    return;
  }
  
  console.log('Snippet loader: Laden voor', categoryPath);

  const grid = document.querySelector('.gift-grid');
  if (!grid) {
    console.log('Snippet loader: Geen gift-grid gevonden');
    return;
  }

  const existingCards = grid.querySelectorAll('.gift-card');
  existingCards.forEach(card => card.remove());

  try {
    const manifestRes = await fetch('/' + categoryPath + 'manifest.json');
    if (!manifestRes.ok) {
      console.log('Snippet loader: Manifest niet gevonden');
      return;
    }

    const manifest = await manifestRes.json();
    const files = manifest.files || [];
    const filesToLoad = files.slice(0, MAX_ITEMS);

    console.log('Snippet loader: Laden', filesToLoad.length, 'bestanden');

    for (const file of filesToLoad) {
      try {
        const res = await fetch('/' + categoryPath + file);
        if (res.ok) {
          const html = await res.text();
          const wrapper = document.createElement('div');
          wrapper.className = 'snippet-card';
          wrapper.innerHTML = html;
          grid.appendChild(wrapper);
        } else {
          console.log('Snippet laden mislukt:', file, res.status);
        }
      } catch (e) {
        console.log('Snippet laden mislukt:', file, e);
      }
    }
  } catch (e) {
    console.log('Snippet loader error:', e);
  }
}

document.addEventListener('DOMContentLoaded', loadSnippets);
