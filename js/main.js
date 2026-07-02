/* ==========================================================================
   main.js

   SOFTWARE DESIGN PRINCIPLES APPLIED:
   ─────────────────────────────────────
   1. Single Responsibility Principle (SRP)
      Each function does exactly ONE thing.
      initSearch()      → only handles search input wiring
      initFilters()     → only handles filter pill wiring
      applyFilters()    → only handles filter+search logic
      animateCounter()  → only animates one counter
      initCounters()    → only observes and triggers counters
      initCardNav()     → only handles card click/keyboard nav

   2. Open/Closed Principle (OCP)
      To add a new interactive behaviour, add a new init function.
      Never modify existing ones. Call the new one at the bottom.

   3. DRY (Don't Repeat Yourself)
      applyFilters() is the single source of truth for visibility logic.
      Both search and filter both call it — they never duplicate that logic.

   4. Dependency Inversion
      Functions depend on abstractions (selectors as parameters)
      rather than hardcoded IDs, making them reusable and testable.
   ========================================================================== */

'use strict';

/* ──────────────────────────────────────────────────────
   STATE
   Central state object — one place to read current state.
   Never set .activeFilter or .query anywhere except here
   and the setFilter / setQuery helpers below.
   ──────────────────────────────────────────────────────── */
const state = {
    activeFilter: 'all',
    query:        ''
};

function setFilter(value) { state.activeFilter = value; }
function setQuery(value)  { state.query = value.trim().toLowerCase(); }


/* ──────────────────────────────────────────────────────
   DOM HELPERS
   Pure functions — take a selector, return elements.
   No side effects, easily replaceable without touching
   the rest of the codebase (Dependency Inversion).
   ──────────────────────────────────────────────────────── */
function qs(selector, root = document)   { return root.querySelector(selector); }
function qsa(selector, root = document) { return [...root.querySelectorAll(selector)]; }


/* ──────────────────────────────────────────────────────
   VISIBILITY HELPERS
   Single Responsibility: each function controls
   exactly one element's visibility.
   ──────────────────────────────────────────────────────── */
function showEl(el) { el.classList.remove('hidden'); }
function hideEl(el) { el.classList.add('hidden'); }
function setVisible(el, visible) { visible ? showEl(el) : hideEl(el); }


/* ──────────────────────────────────────────────────────
   CARD VISIBILITY LOGIC
   Single Responsibility: decides if ONE card matches
   the current state. Returns a boolean — no side effects.
   ──────────────────────────────────────────────────────── */
function cardMatchesState(card, sectorKey) {
    const sectorMatch = state.activeFilter === 'all' || sectorKey === state.activeFilter;

    if (!sectorMatch) return false;
    if (!state.query)  return true;

    const name = qs('.card__name',  card)?.textContent.toLowerCase() ?? '';
    const desc = qs('.card__desc',  card)?.textContent.toLowerCase() ?? '';
    const tag  = qs('.card__tag',  card)?.textContent.toLowerCase()  ?? '';

    return name.includes(state.query) || desc.includes(state.query) || tag.includes(state.query);
}


/* ──────────────────────────────────────────────────────
   APPLY FILTERS
   Single Responsibility: applies current state to the DOM.
   Called by both search and filter — never duplicated.
   ──────────────────────────────────────────────────────── */
function applyFilters() {
    const sectors   = qsa('.sector');
    const noResults = qs('#noResults');
    let totalVisible = 0;

    sectors.forEach(sector => {
        const sectorKey = sector.dataset.sector;
        let visibleInSector = 0;

        qsa('.card', sector).forEach(card => {
            const matches = cardMatchesState(card, sectorKey);
            setVisible(card, matches);
            if (matches) visibleInSector++;
        });

        setVisible(sector, visibleInSector > 0);
        totalVisible += visibleInSector;

        /* Update the "N companies" count label */
        updateSectorCount(sector, visibleInSector);
    });

    /* Show/hide empty state */
    if (noResults) noResults.style.display = totalVisible === 0 ? 'flex' : 'none';
}


/* ──────────────────────────────────────────────────────
   UPDATE SECTOR COUNT LABEL
   Single Responsibility: updates only the count label text.
   ──────────────────────────────────────────────────────── */
function updateSectorCount(sector, count) {
    const countEl = qs('.sector__count', sector);
    if (!countEl || count === 0) return;
    countEl.textContent = `${count} ${count === 1 ? 'company' : 'companies'}`;
}


/* ──────────────────────────────────────────────────────
   INIT: SEARCH
   Single Responsibility: wires up the search input only.
   ──────────────────────────────────────────────────────── */
function initSearch() {
    const input = qs('#searchInput');
    if (!input) return;

    input.addEventListener('input', () => {
        setQuery(input.value);
        applyFilters();
    });
}


/* ──────────────────────────────────────────────────────
   INIT: FILTER PILLS
   Single Responsibility: wires up filter pill buttons only.
   ──────────────────────────────────────────────────────── */
function initFilters() {
    const btns = qsa('.filter-pill');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            /* Deactivate all, activate clicked */
            btns.forEach(b => b.classList.remove('filter-pill--active'));
            btn.classList.add('filter-pill--active');

            setFilter(btn.dataset.filter);
            applyFilters();
        });
    });
}


/* ──────────────────────────────────────────────────────
   COUNTER ANIMATION
   Single Responsibility: animates ONE counter element.
   Pure function — no global side effects.
   ──────────────────────────────────────────────────────── */
function animateCounter(el, durationMs = 1400) {
    const raw    = el.textContent;
    const suffix = raw.replace(/[0-9]/g, '');
    const target = parseInt(raw, 10);
    if (isNaN(target)) return;

    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}


/* ──────────────────────────────────────────────────────
   INIT: COUNTERS
   Single Responsibility: observes stat bars and triggers
   counter animations. Does not animate — delegates to
   animateCounter() (SRP + open for extension of
   the animation itself without touching observer logic).
   ──────────────────────────────────────────────────────── */
function initCounters() {
    const numberEls = qsa('.hero__stat-number, .companies-stats__number');
    if (!numberEls.length) return;

    let animated = false;

    if (!('IntersectionObserver' in window)) {
        /* Graceful degradation for very old browsers */
        numberEls.forEach(el => animateCounter(el));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting || animated) return;
        animated = true;
        numberEls.forEach(el => animateCounter(el));
    }, { threshold: 0.4 });

    qsa('.hero__stats-bar, .companies-stats').forEach(el => observer.observe(el));
}


/* ──────────────────────────────────────────────────────
   INIT: CARD NAVIGATION
   Single Responsibility: makes cards keyboard-accessible
   and navigable by click. Does not filter or animate.
   ──────────────────────────────────────────────────────── */
function navigateCard(card) {
    const link = qs('.card__link', card);
    if (link) window.location.href = link.href;
}

function initCardNav() {
    qsa('.card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        card.addEventListener('click', e => {
            if (!e.target.closest('.card__link')) navigateCard(card);
        });

        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateCard(card);
            }
        });
    });
}


/* ──────────────────────────────────────────────────────
   BOOT
   Open/Closed applied to initialisation:
   - Add a new feature = add a new init function + call it here.
   - Never modify existing init functions to add unrelated behaviour.
   ──────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initFilters();
    initCounters();
    initCardNav();
});