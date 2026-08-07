# Superior Construct Group

The company website for **Superior Construct Group, LLC** — a Maryland-based
general contracting and engineering firm serving Maryland, Washington DC, and
Northern Virginia.

SCG specializes in residential, commercial, healthcare, and institutional
design and construction, with a distinctive focus on MEP design, systems
integration, and performance-driven delivery. The firm pairs construction
delivery with in-house commissioning and energy expertise, so buildings are not
only built to specification — they operate efficiently, reliably, and as
intended.

🔗 **[www.superiorconstructgroup.com](https://www.superiorconstructgroup.com)**

---

## What the site includes

Seven pages, each reachable from the main navigation.

| Page | What's on it |
| --- | --- |
| **Home** | Company positioning, headline capability areas, track-record figures, featured projects, and rotating client testimonials |
| **Services** | All eleven service lines, grouped into the Construction and Engineering practices |
| **Markets** | The six sectors SCG builds and verifies in, from government and healthcare to private residential |
| **Our Work** | A recent project shown through draggable before/after comparisons, a finished-work gallery, and full client testimonials |
| **Qualifications** | Company registrations, licensing, individual credentials, and downloadable documents for contracting officers and prime contractors |
| **About** | Company background, leadership profiles, and the four-stage delivery approach |
| **Contact** | Direct contacts by purpose, service area, and an enquiry form |

## Services offered

**Construction Services**

- General Contracting (Residential & Commercial)
- Interior Renovations & Tenant Fit-Outs
- Kitchen, Bathroom & Basement Renovations
- Facility Upgrades & Modernization
- Construction & Project Management

**Engineering Services**

- MEP Design, Coordination & Systems Integration
- Commissioning, Re-Commissioning, Retro-Commissioning, Building Envelope
  Commissioning & Quality Assurance
- Energy Efficiency Improvements
- Energy Efficiency Rebates & Tax Incentives
- Energy Auditing, Energy Retrofits & Facility Condition Assessments
- Benchmarking, Energy Modeling, Measurement & Verification (M&V) and BEPS
  Compliance

## Features

- **Before/after sliders** — drag a handle across a project photo to reveal the
  original condition underneath
- **Client testimonials** — an auto-rotating carousel on the home page, full
  quotes on Our Work
- **Document library** — credentials and capability statements open directly
  from the Qualifications page
- **Enquiry form** — validated, spam-protected, delivered straight to the
  company inbox
- **Responsive** — adapts from wide desktop down to phones, with a collapsing
  navigation menu
- **Accessible** — keyboard navigable, screen-reader labelled, and it respects
  the reduced-motion system setting

## Contact

| | |
| --- | --- |
| Projects | [mabaza@superiorconstruc.com](mailto:mabaza@superiorconstruc.com) |
| General information | [info@superiorconstruc.com](mailto:info@superiorconstruc.com) |
| Phone | [(202) 738-3036](tel:+12027383036) |
| Service area | Maryland · Washington, DC · Northern Virginia |

---

## For developers

Plain HTML, CSS, and vanilla JavaScript. No framework, no build step, no
dependencies — open `index.html` in a browser and it runs.

```
index.html          all seven pages, hash-routed (#/services, #/about, …)
assets/styles.css   styling; brand colours and fonts are variables at the top
assets/app.js       routing, animations, sliders, carousel, form handling
img/                photography (WebP)
docs/               downloadable PDF credentials
```

### Running locally

```bash
python -m http.server 5177
```

Then open <http://localhost:5177>.

### Deploying

Any static host works. Upload the folder — there is nothing to compile.

When pointing a domain at a new host, change **only** the `A`, `AAAA`, and
`CNAME` records. Leave `MX`, `TXT`/SPF, and `DKIM` records alone; those carry
email, and removing them breaks mail delivery silently.

### Editing content

Text lives directly in `index.html`, grouped by page inside
`<section class="page" data-page="…">` blocks. Colours and fonts are CSS
variables at the top of `assets/styles.css`. Photos can be swapped by replacing
files in `img/` under the same filenames — compress new ones at
[squoosh.app](https://squoosh.app) (WebP, quality ~78) to keep pages fast.

### Before launch

Three placeholders still need real values:

1. **Contact form key** — search `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` in
   `index.html`. Get a free key at [web3forms.com](https://web3forms.com).
   Until it's set, the form shows an error and points visitors at the email
   address instead.
2. **LinkedIn URL** — search `REPLACE-WITH-SEIF-PROFILE` in `index.html`.
3. **Documents** — the Qualifications page links to nine PDFs in `docs/`; see
   the `href` values in `index.html` for the expected filenames.
