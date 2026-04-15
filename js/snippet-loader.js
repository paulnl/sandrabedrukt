// Categorie Snippet Loader
// Laadt HTML snippets uit categorie folders (max 10 per pagina)

const categoryMap = {
  "mok-met-name.html": "categorieen/mok-met-name/",
  "kraamcadeau-met-name.html": "categorieen/kraamcadeau-met-name/",
  "cadeau-met-foto.html": "categorieen/cadeau-met-foto/",
  "goedkope-gepersonaliseerde-cadeaus.html": "categorieen/goedkope-cadeaus/"
};

const MAX_ITEMS = 10;

async function loadSnippets() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const categoryPath = categoryMap[page];
  if (!categoryPath) return;

  const grid = document.querySelector('.gift-grid');
  if (!grid) return;

  try {
    const manifestRes = await fetch('/' + categoryPath + 'manifest.json');
    if (!manifestRes.ok) return;

    const manifest = await manifestRes.json();
    const files = manifest.files || [];
    const filesToLoad = files.slice(0, MAX_ITEMS);

    for (const file of filesToLoad) {
      try {
        const res = await fetch('/' + categoryPath + file);
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
  } catch (e) {
    console.log('Manifest laden mislukt');
  }
}

document.addEventListener('DOMContentLoaded', loadSnippets);
