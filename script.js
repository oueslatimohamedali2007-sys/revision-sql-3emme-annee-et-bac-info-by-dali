// Gestion du Theme Sombre / Clair
const themeBtn = document.getElementById('themeBtn');

// Charger le thème sauvegardé
if (localStorage.getItem('theme') === 'dark') {
  document.body.dataset.theme = 'dark';
  if(themeBtn) themeBtn.textContent = '🌙';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'dark';
    if (isDark) {
      document.body.dataset.theme = '';
      themeBtn.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.dataset.theme = 'dark';
      themeBtn.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Barre de progression de défilement & Bouton Retour en haut
const progressBar = document.getElementById('progressBar');
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  if (scrollHeight > 0 && progressBar) {
    progressBar.style.width = `${(scrollTop / scrollHeight) * 100}%`;
  }

  if (topBtn) {
    topBtn.style.display = scrollTop > 300 ? 'flex' : 'none';
  }
});

if (topBtn) {
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Recherche dynamique sur la page d'accueil
const lessonSearch = document.getElementById('lessonSearch');
const clearSearch = document.getElementById('clearSearch');

if (lessonSearch) {
  lessonSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const boxes = document.querySelectorAll('.lesson-box');
    let visibleCount = 0;

    boxes.forEach(box => {
      const title = box.querySelector('h4').textContent.toLowerCase();
      const desc = box.querySelector('p').textContent.toLowerCase();
      const matches = title.includes(query) || desc.includes(query);
      
      if (query === '') {
        box.style.display = 'block';
        box.classList.remove('highlight');
        visibleCount++;
      } else if (matches) {
        box.style.display = 'block';
        box.classList.add('highlight');
        visibleCount++;
      } else {
        box.style.display = 'none';
        box.classList.remove('highlight');
      }
    });

    // Afficher un message si aucun résultat
    const container = document.querySelector('.lesson-choice');
    if (query && visibleCount === 0) {
      if (!document.getElementById('no-results')) {
        const noResults = document.createElement('div');
        noResults.id = 'no-results';
        noResults.style.cssText = 'grid-column: 1/-1; padding: 20px; text-align: center; color: var(--muted);';
        noResults.textContent = '❌ Aucun résultat trouvé pour "' + e.target.value + '"';
        container.appendChild(noResults);
      }
    } else {
      const noResults = document.getElementById('no-results');
      if (noResults) noResults.remove();
    }
  });
}

if (clearSearch && lessonSearch) {
  clearSearch.addEventListener('click', () => {
    lessonSearch.value = '';
    const boxes = document.querySelectorAll('.lesson-box');
    boxes.forEach(box => {
      box.style.display = 'block';
      box.classList.remove('highlight');
    });
    const noResults = document.getElementById('no-results');
    if (noResults) noResults.remove();
  });
}