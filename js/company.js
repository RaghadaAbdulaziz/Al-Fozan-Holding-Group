/* ==========================================================================
   company.js

   SOFTWARE DESIGN PRINCIPLES:
   - Single Responsibility: each function does exactly one thing
   - Open/Closed: add new form behaviour by adding new init functions,
     never by modifying existing ones
   ========================================================================== */

'use strict';

/* ── URL helpers ─────────────────────────────────────────────────────────── */
function getCompanyIdFromUrl() {
    return new URLSearchParams(window.location.search).get('id');
}

function findCompanyById(id) {
    return getAllCompanies().find(c => c.id === id);
}

/* ── Logo renderer ───────────────────────────────────────────────────────── */
function renderLogo(company) {
    if (company.logo && company.logo.trim() !== '') {
        return `<img class="badge badge--brand badge--lg"
                 src="${company.logo}"
                 alt="${company.name} logo"
                 onerror="this.outerHTML='<div class=\\'badge badge--ghost badge--lg\\'>${company.initials}</div>'">`;
    }
    return `<div class="badge badge--ghost badge--lg">${company.initials}</div>`;
}

/* ── Render company header (logo, name, sector, description) ─────────────── */
function renderCompanyHeader(company) {
    document.getElementById('breadcrumb-sector').textContent  = company.sectorName;
    document.getElementById('breadcrumb-name').textContent    = company.name;
    document.getElementById('company-logo').innerHTML         = renderLogo(company);
    document.getElementById('company-sector-tag').textContent = company.sectorName;
    document.getElementById('company-name').textContent       = company.name;
    document.getElementById('company-desc').textContent       = company.description;
    document.getElementById('company-overview').textContent   = company.description;
    document.getElementById('contact-phone').textContent      = company.phone;
    document.getElementById('contact-email').textContent      = company.email;
    document.getElementById('contact-address').textContent    = company.address;
    document.title = `Al Fozan — ${company.name}`;
}

/* ── Render notable project (hidden if none set in data.js) ──────────────── */
function renderNotableProject(company) {
    const section = document.getElementById('individual-project-section');
    if (!company.notableProject) {
        section.style.display = 'none';
        return;
    }
    section.style.display = '';
    document.getElementById('project-title').textContent = company.notableProject.title;
    document.getElementById('project-desc').textContent  = company.notableProject.description;
}

/* ── Upload zone: drag/drop + filename display ───────────────────────────── */
/*
   SRP: this function only handles ONE upload zone's UI feedback.
   It is called once per zone — no global state, no side effects.
*/
function initUploadZone(inputId, filenameId, zoneId) {
    const input    = document.getElementById(inputId);
    const filename = document.getElementById(filenameId);
    const zone     = document.getElementById(zoneId);
    if (!input || !filename || !zone) return;

    /* Show selected filename(s) */
    function showFiles(files) {
        if (!files || !files.length) return;
        const names = [...files].map(f => f.name).join(', ');
        filename.textContent = '📎 ' + names;
        filename.classList.add('show');
    }

    /* File picker change */
    input.addEventListener('change', () => showFiles(input.files));

    /* Drag over — highlight zone */
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('dragover');
    });

    /* Drag leave — remove highlight */
    zone.addEventListener('dragleave', e => {
        if (!zone.contains(e.relatedTarget)) {
            zone.classList.remove('dragover');
        }
    });

    /* Drop — assign files to the input and show names */
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            try {
                input.files = e.dataTransfer.files;
            } catch (err) {
                /* some browsers don't allow assigning FileList — show name anyway */
            }
            showFiles(e.dataTransfer.files);
        }
    });
}

/* ── Reset upload zone back to its empty state ───────────────────────────── */
function resetUploadZone(filenameId) {
    const filename = document.getElementById(filenameId);
    if (!filename) return;
    filename.textContent = '';
    filename.classList.remove('show');
}

/* ── Toggle forms open/closed when buttons are clicked ───────────────────── */
/*
   OCP: to add a new form toggle, add a new button/form pair here
   without modifying the existing toggle logic.
*/
function setupActionButtons() {
    const complaintBtn  = document.getElementById('complaint-btn');
    const jobBtn        = document.getElementById('job-btn');
    const complaintForm = document.getElementById('complaint-form');
    const jobForm       = document.getElementById('job-form');

    complaintBtn.addEventListener('click', () => {
        jobForm.classList.remove('open');
        complaintForm.classList.toggle('open');
        if (complaintForm.classList.contains('open')) {
            complaintForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    jobBtn.addEventListener('click', () => {
        complaintForm.classList.remove('open');
        jobForm.classList.toggle('open');
        if (jobForm.classList.contains('open')) {
            jobForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

/* ── Form submission: show confirmation, reset fields + upload zones ─────── */
/*
   No real back-end — submission shows a confirmation message only,
   as documented in the project plan (mock-up scope).
*/
function setupFormSubmissions() {
    document.getElementById('complaint-form').addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('complaint-confirmation').classList.add('show');
        this.reset();
        resetUploadZone('complaint-filename');
    });

    document.getElementById('job-form').addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('job-confirmation').classList.add('show');
        this.reset();
        resetUploadZone('job-filename');
        resetUploadZone('job-extra-filename');
    });
}

/* ── Boot ────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const id      = getCompanyIdFromUrl();
    const company = findCompanyById(id);

    if (!company) {
        document.getElementById('company-page-content').innerHTML =
            `<p style="padding:2rem 32px;">
        Company not found. Go back to
        <a href="companies.html" style="color:#9D4349;">all companies</a>.
       </p>`;
        return;
    }

    renderCompanyHeader(company);
    renderNotableProject(company);
    setupActionButtons();
    setupFormSubmissions();

    /* Wire all three upload zones */
    initUploadZone('complaint-doc',  'complaint-filename',  'complaint-upload-zone');
    initUploadZone('job-cv',         'job-filename',        'job-upload-zone');
    initUploadZone('job-extra',      'job-extra-filename',  'job-extra-zone');
});