(() => {
  const searchInput = document.getElementById('searchInput');
  const searchForm = document.getElementById('searchForm');
  const cards = Array.from(document.querySelectorAll('.resource-card'));
  const filters = Array.from(document.querySelectorAll('.filter'));
  const resultsLabel = document.getElementById('resultsLabel');
  const clearSearch = document.getElementById('clearSearch');
  const emptyState = document.getElementById('emptyState');
  const resetFilters = document.getElementById('resetFilters');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  let activeCategory = 'all';
  const normalize = value => value.toLowerCase().trim();

  function renderCards() {
    const query = normalize(searchInput.value);
    let visible = 0;
    cards.forEach(card => {
      const categoryMatches = activeCategory === 'all' || card.dataset.category === activeCategory;
      const searchable = normalize((card.dataset.search || '') + ' ' + card.innerText);
      const queryMatches = !query || searchable.includes(query);
      const show = categoryMatches && queryMatches;
      card.hidden = !show;
      if (show) visible++;
    });
    resultsLabel.textContent = query
      ? `Showing ${visible} result${visible === 1 ? '' : 's'} for “${searchInput.value.trim()}”`
      : activeCategory === 'all'
        ? `Showing all ${visible} resources`
        : `Showing ${visible} ${activeCategory} resource${visible === 1 ? '' : 's'}`;
    clearSearch.hidden = !query && activeCategory === 'all';
    emptyState.hidden = visible !== 0;
  }

  filters.forEach(button => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      filters.forEach(filter => {
        const selected = filter === button;
        filter.classList.toggle('active', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      renderCards();
    });
  });

  searchInput.addEventListener('input', renderCards);
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    renderCards();
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelectorAll('[data-search]').forEach(button => {
    button.addEventListener('click', () => {
      searchInput.value = button.dataset.search;
      activeCategory = 'all';
      filters.forEach(filter => {
        const selected = filter.dataset.category === 'all';
        filter.classList.toggle('active', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      renderCards();
      document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
      searchInput.focus({ preventScroll: true });
    });
  });

  function reset() {
    searchInput.value = '';
    activeCategory = 'all';
    filters.forEach(filter => {
      const selected = filter.dataset.category === 'all';
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    renderCards();
  }
  clearSearch.addEventListener('click', reset);
  resetFilters.addEventListener('click', reset);

  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  renderCards();
})();