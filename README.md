# Superior Construct Group — website

Static site. Plain HTML + CSS + vanilla JS. No build step, no dependencies.
Open `index.html` in a browser to preview locally.

```
index.html          all seven pages, hash-routed (#/services, #/about, …)
assets/styles.css   all styling, brand tokens at the top
assets/app.js       router, reveal animations, counters, testimonial rotator,
                    before/after sliders, contact-form submission
img/                photography (see "Images required" below)
docs/               PDF credentials linked from the Qualifications page
```

---

## 1. Images — done

All 12 images are in `img/`. This is the mapping that was used, for reference
if any photo needs swapping later.

| Filename in `img/`   | Source photo                                                |
| -------------------- | ----------------------------------------------------------- |
| `img/logo.webp`      | `SCG+Logo.webp`                                              |
| `img/svc-right.webp` | `imgg-demo-I5u4rweV.webp`                                    |
| `img/svc-left.webp`  | `imgg-demo-q9f520xp.webp`                                    |
| `img/about.webp`     | `imgg-od3-zy_nmfag.webp`                                     |
| `img/contact.webp`   | `imgg-od3-2aqj_g5a.webp`                                     |
| `img/seif.webp`      | `P16-de3d0.webp`                                             |
| `img/before-1.webp`  | `IMG_5015.webp`                                              |
| `img/before-2.webp`  | `IMG_5019.webp`                                              |
| `img/after-1.webp`   | `64020882658__51AB0A31-A399-4D7F-91A1-E391C76FAE38.webp`     |
| `img/after-2.webp`   | `IMG_5376.webp`                                              |
| `img/after-3.webp`   | `IMG_5355.webp`                                              |
| `img/after-4.webp`   | `IMG_5414.webp`                                              |

Keep the `.webp` filenames if swapping a photo — nothing in the code changes.

All 12 have been re-compressed with `sharp` at quality 78: **1281 KB → 144 KB
(89% smaller)**. Measured quality against the originals is 38–43 dB PSNR, i.e.
visually identical. `logo.webp` was also downscaled 1174 px → 340 px wide,
which still covers 3× retina for its 102 px display width.

If you swap in a new photo, run it through <https://squoosh.app> (WebP, quality
~78) first so the page stays light.

## 2. Documents required

The Qualifications page links to these paths. Add the PDFs with exactly these
names, or edit the `href` values in `index.html` (search for `docs/`).

```
docs/commissioning-certification.pdf
docs/professional-engineering-license.pdf
docs/brochure.pdf
docs/certified-energy-manager.pdf
docs/capability-statement.pdf
docs/seif-abaza-business-card.pdf
docs/articles-of-organization.pdf
docs/seif-abaza-resume.pdf
docs/diver-abudayeh-business-card.pdf
```

## 3. Before going live — two placeholders to replace

1. **LinkedIn URL.** In `index.html`, search for `REPLACE-WITH-SEIF-PROFILE`
   and paste the real profile URL.
2. **Contact form key.** In `index.html`, search for
   `REPLACE_WITH_WEB3FORMS_ACCESS_KEY`. Get a free key at
   <https://web3forms.com> using `info@superiorconstruc.com` — submissions are
   emailed to that address. Until the key is set, the form shows an error and
   points visitors at the email address instead.

---

## Deploying

Any static host works. Cloudflare Pages is the recommendation — free,
global CDN, free SSL.

1. Create a free account at <https://dash.cloudflare.com>.
2. Workers & Pages → Create → Pages → **Upload assets**.
3. Drag the whole project folder in. It goes live at
   `<project>.pages.dev` immediately.
4. Custom domains → add `superiorconstructgroup.com` and
   `www.superiorconstructgroup.com`.
5. At the current domain registrar, point the DNS records Cloudflare shows you.

### DNS warning

Change **only** the `A` / `AAAA` / `CNAME` records for `@` and `www`.
Do **not** touch `MX`, `TXT`/SPF, or DKIM records — removing those breaks
email on the domain.

## Editing content

Text lives directly in `index.html`, grouped by page inside
`<section class="page" data-page="…">` blocks. Colours and fonts are CSS
variables at the top of `assets/styles.css`.
