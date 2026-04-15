const categoryMap = {
  "cadeau-met-foto.html": "categorieen/cadeau-met-foto/",
  "kraamcadeau-met-naam.html": "categorieen/kraamcadeau-met-naam/",
  "goedkope-gepersonaliseerde-cadeaus.html": "categorieen/goedkope-cadeaus/",
  "mok-met-naam.html": "categorieen/mok-met-naam/",
};

const HOME_CATEGORIES = [
  "categorieen/cadeau-met-foto/",
  "categorieen/kraamcadeau-met-naam/",
  "categorieen/goedkope-cadeaus/",
  "categorieen/mok-met-naam/",
];

const MAX_ITEMS_PER_CATEGORY = 4;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getPageName() {
  return window.location.pathname.split("/").pop() || "index.html";
}

async function fetchManifest(categoryPath) {
  const res = await fetch(`./${categoryPath}_manifest.json`);
  if (!res.ok) throw new Error(`Manifest niet gevonden: ${categoryPath}`);
  return await res.json();
}

async function fetchSnippet(categoryPath, file) {
  const res = await fetch(`./${categoryPath}${file}`);
  if (!res.ok) throw new Error(`Snippet niet gevonden: ${file}`);
  return await res.text();
}

function injectSnippets(grid, snippets) {
  grid.innerHTML = "";
  snippets.forEach((html) => {
    const wrapper = document.createElement("div");
    wrapper.className = "gift-card";
    wrapper.innerHTML = html;
    grid.appendChild(wrapper);
  });
}

async function loadCategoryPage() {
  const page = getPageName();
  const categoryPath = categoryMap[page];
  if (!categoryPath) return;

  const grid = document.querySelector(".gift-grid");
  if (!grid) return;

  try {
    const manifest = await fetchManifest(categoryPath);
    const files = Array.isArray(manifest.files) ? manifest.files : [];
    const snippets = [];

    for (const file of files) {
      try {
        snippets.push(await fetchSnippet(categoryPath, file));
      } catch (e) {
        console.error(e);
      }
    }

    injectSnippets(grid, snippets);
  } catch (e) {
    console.error("Categoriepagina laden mislukt:", e);
  }
}

async function loadHomePage() {
  const grid = document.querySelector(".gift-grid");
  if (!grid) return;

  try {
    let allSnippets = [];

    for (const categoryPath of HOME_CATEGORIES) {
      try {
        const manifest = await fetchManifest(categoryPath);
        const files = Array.isArray(manifest.files)
          ? manifest.files.slice(0, MAX_ITEMS_PER_CATEGORY)
          : [];

        for (const file of files) {
          try {
            const html = await fetchSnippet(categoryPath, file);
            allSnippets.push(html);
          } catch (e) {
            console.error(e);
          }
        }
      } catch (e) {
        console.error("Categorie op homepage mislukt:", categoryPath, e);
      }
    }

    injectSnippets(grid, shuffle(allSnippets));
  } catch (e) {
    console.error("Homepage laden mislukt:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const page = getPageName();

  if (page === "index.html" || page === "") {
    loadHomePage();
  } else {
    loadCategoryPage();
  }
});
