/* ==========================================================================
   company.js
   Builds the sub-company detail page (company.html): reads which company
   to show from the URL (e.g. company.html?id=madar-building), renders its
   info, contact details, and notable project (if it has one), and wires
   up the "File a complaint" / "Apply for a job" buttons and forms.
   ========================================================================== */

function getCompanyIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function findCompanyById(id) {
    return getAllCompanies().find(function (company) {
        return company.id === id;
    });
}

function renderCompanyHeader(company) {
    document.getElementById("breadcrumb").innerHTML =
        'Home <i class="ti ti-chevron-right"></i> ' +
        company.sectorName +
        ' <i class="ti ti-chevron-right"></i> ' +
        company.name;

    document.getElementById("company-logo").innerHTML = renderLogo(company);
    document.getElementById("sector-tag").textContent = company.sectorName;
    document.getElementById("company-name").textContent = company.name;
    document.getElementById("company-description").textContent = company.description;

    document.getElementById("contact-phone").textContent = company.phone;
    document.getElementById("contact-email").textContent = company.email;
    document.getElementById("contact-address").textContent = company.address;
}

/* The notable project section only renders if this company actually has
   one set in data.js (company.notableProject is not null). Companies
   without a notable project simply skip this section entirely. */
function renderNotableProject(company) {
    var section = document.getElementById("notable-project-section");
    if (!company.notableProject) {
        section.style.display = "none";
        return;
    }
    section.style.display = "";
    document.getElementById("project-title").textContent = company.notableProject.title;
    document.getElementById("project-description").textContent = company.notableProject.description;
}

/* Shows the chosen form (complaint or job) and hides the other one. */
function setupActionButtons() {
    document.getElementById("complaint-btn").addEventListener("click", function () {
        document.getElementById("job-form").classList.remove("open");
        document.getElementById("complaint-form").classList.toggle("open");
    });

    document.getElementById("job-btn").addEventListener("click", function () {
        document.getElementById("complaint-form").classList.remove("open");
        document.getElementById("job-form").classList.toggle("open");
    });
}

/* There is no real back-end, so submitting either form does not send data
   anywhere. It simply prevents the default page reload and shows an
   on-screen confirmation message instead, as described in the project plan. */
function setupFormSubmissions() {
    document.getElementById("complaint-form").addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("complaint-confirmation").classList.add("show");
        event.target.reset();
    });

    document.getElementById("job-form").addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("job-confirmation").classList.add("show");
        event.target.reset();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var id = getCompanyIdFromUrl();
    var company = findCompanyById(id);

    if (!company) {
        document.getElementById("company-page-content").innerHTML =
            "<p style='padding:2rem 32px;'>Company not found. Please go back to the " +
            "<a href='index.html' style='color:#8C3A42;'>homepage</a> and select a sub-company.</p>";
        return;
    }

    renderCompanyHeader(company);
    renderNotableProject(company);
    setupActionButtons();
    setupFormSubmissions();
});