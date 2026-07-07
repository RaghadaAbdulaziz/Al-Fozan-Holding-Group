/* ==========================================================================
   data.js
   This file is the website's "database". Since this is a static mock-up
   with no real back-end or live database, all sector and sub-company
   information lives here as plain JavaScript objects, and main.js /
   company.js read from this file to build the pages.

   --------------------------------------------------------------------------
   HOW TO ADD A REAL COMPANY LOGO (read this before editing anything below)
   --------------------------------------------------------------------------
   1. Create (or use) the folder:  images/logos/
   2. Save the logo image file inside that folder. Use a short file name
      with no spaces, e.g.  madar-building.png
        - PNG with a transparent background works best
        - Roughly square (e.g. 96x96px or larger) gives the cleanest result
        - Keep the file small (under ~100kb) so the page loads quickly
   3. Find that company's entry below and set its "logo" field to the
      path of the file you just saved, for example:

           logo: "images/logos/madar-building.png"

   4. That's it - reload index.html / company.html in the browser and the
      real logo will appear automatically instead of the initials badge.

   NOTE: if "logo" is left as an empty string (""), the website
   automatically falls back to showing the company's initials in a
   coloured badge instead (see renderLogo() in main.js / company.js).
   This means you can add real logos gradually, company by company,
   without breaking anything in the meantime.
   ========================================================================== */

const sectors = [
    {
        id: "retail",
        name: "Retail",
        icon: "ti-shopping-bag",
        companies: [
            {
                id: "uec",
                name: "United Electronics Co.",
                initials: "UEC",
                logo: "", // e.g. "images/logos/uec.png"
                description:
                    "A subsidiary of Al Fozan Holding specialising in consumer electronics retail across Saudi Arabia.",
                phone: "+966 13 894 0909",
                email: "uec@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "uhc",
                name: "United Homeware Co.",
                initials: "UHC",
                logo: "images/logos/uhc.png",
                description:
                    "A subsidiary of Al Fozan Holding focused on home and houseware retail products.",
                phone: "+966 13 894 0909",
                email: "uhc@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            }
        ]
    },
    {
        id: "real-estate",
        name: "Real estate",
        icon: "ti-building-skyscraper",
        companies: [
            {
                id: "rsd",
                name: "Retal Structural Development",
                initials: "RSD",
                logo: "", // e.g. "images/logos/retal-structural.png"
                description:
                    "A subsidiary of Al Fozan Holding focused on structural and residential real estate development across Saudi Arabia, delivering large-scale infrastructure and housing projects.",
                phone: "+966 13 894 0909",
                email: "retal@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: {
                    title: "Mr. Abdullatif Al Fozan Road",
                    description:
                        "A flagship infrastructure project recognising the company's founder and his contribution to the Eastern Province's development."
                }
            },
            {
                id: "aoula",
                name: "Al Oula Real Estate",
                initials: "AO",
                logo: "", // e.g. "images/logos/al-oula.png"
                description:
                    "A subsidiary of Al Fozan Holding involved in real estate development and management.",
                phone: "+966 13 894 0909",
                email: "aloula@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "shomoul",
                name: "Shomoul Holding",
                initials: "SH",
                logo: "", // e.g. "images/logos/shomoul.png"
                description:
                    "A subsidiary of Al Fozan Holding operating within the real estate sector.",
                phone: "+966 13 894 0909",
                email: "shomoul@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "nesaj",
                name: "Nesaj Real Estate",
                initials: "NS",
                logo: "", // e.g. "images/logos/nesaj.png"
                description:
                    "A subsidiary of Al Fozan Holding focused on residential real estate development.",
                phone: "+966 13 894 0909",
                email: "nesaj@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            }
        ]
    },
    {
        id: "industrial",
        name: "Industrial",
        icon: "ti-building-factory-2",
        companies: [
            {
                id: "bawan",
                name: "Bawan Holding",
                initials: "BH",
                logo: "", // e.g. "images/logos/bawan.png"
                description:
                    "A subsidiary of Al Fozan Holding operating in manufacturing and industrial sectors.",
                phone: "+966 13 894 0909",
                email: "bawan@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "arnon",
                name: "Arnon Plastic Industries",
                initials: "AP",
                logo: "", // e.g. "images/logos/arnon.png"
                description:
                    "A subsidiary of Al Fozan Holding manufacturing plastic industrial products.",
                phone: "+966 13 894 0909",
                email: "arnon@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "midad",
                name: "Midad Holding",
                initials: "MH",
                logo: "", // e.g. "images/logos/midad.png"
                description:
                    "Established in 2007, a wholly-owned subsidiary of Al Fozan Holding trading in oil and gas.",
                phone: "+966 13 894 0909",
                email: "midad@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "uniglass",
                name: "Uniglass",
                initials: "UG",
                logo: "", // e.g. "images/logos/uniglass.png"
                description:
                    "United Glass Industries, a manufacturer in Al Fozan Holding's industrial portfolio.",
                phone: "+966 13 894 0909",
                email: "uniglass@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "unisteel",
                name: "Unisteel",
                initials: "US",
                logo: "", // e.g. "images/logos/unisteel.png"
                description:
                    "United Steel Industries, a manufacturer of scaffolding and formwork products.",
                phone: "+966 13 894 0909",
                email: "unisteel@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            }
        ]
    },
    {
        id: "trading",
        name: "Trading",
        icon: "ti-truck",
        companies: [
            {
                id: "madar-building",
                name: "Madar Building Materials",
                initials: "MB",
                logo: "", // e.g. "images/logos/madar-building.png"
                description:
                    "The flagship trading company of Al Fozan Holding and one of the largest importers of building materials in Saudi Arabia.",
                phone: "+966 13 894 0909",
                email: "madar.building@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "madar-electrical",
                name: "Madar Electrical Materials",
                initials: "ME",
                logo: "", // e.g. "images/logos/madar-electrical.png"
                description:
                    "Established in 1983, providing a comprehensive suite of electrical products.",
                phone: "+966 13 894 0909",
                email: "madar.electrical@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "madar-hardware",
                name: "Madar Hardware",
                initials: "MH",
                logo: "", // e.g. "images/logos/madar-hardware.png"
                description:
                    "Established in 1993, importing a wide variety of hardware products.",
                phone: "+966 13 894 0909",
                email: "madar.hardware@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            }
        ]
    },
    {
        id: "other",
        name: "Other sectors",
        icon: "ti-dots",
        companies: [
            {
                id: "auva",
                name: "AUVA",
                initials: "AV",
                logo: "", // e.g. "images/logos/auva.png"
                description: "A subsidiary of Al Fozan Holding operating outside its core sectors.",
                phone: "+966 13 894 0909",
                email: "auva@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "gulf-riyadah",
                name: "Gulf Riyadah",
                initials: "GR",
                logo: "", // e.g. "images/logos/gulf-riyadah.png"
                description: "A subsidiary of Al Fozan Holding operating outside its core sectors.",
                phone: "+966 13 894 0909",
                email: "gulfriyadah@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            },
            {
                id: "tadbeir",
                name: "Tadbeir Facilities Mgmt.",
                initials: "TF",
                logo: "", // e.g. "images/logos/tadbeir.png"
                description: "Provides facilities management services across Al Fozan Holding's portfolio.",
                phone: "+966 13 894 0909",
                email: "tadbeir@alfozan-mock.example",
                address: "Al Khobar, Saudi Arabia",
                notableProject: null
            }
        ]
    }
];

/* Flattens all companies from every sector into a single list with their
   sector name/id attached - used by company.html to look up one company
   by id, and by the homepage search box to search across all companies. */
function getAllCompanies() {
    const all = [];
    sectors.forEach(function (sector) {
        sector.companies.forEach(function (company) {
            all.push(Object.assign({}, company, { sectorId: sector.id, sectorName: sector.name }));
        });
    });
    return all;
}