# Daniil – Web Developer Portfolio

Portfolio website of a freelance web developer, plus three demo websites built for fictional small businesses. Plain HTML, CSS, Bootstrap 5 and vanilla JavaScript. No build step, no framework, no backend.

**Live site:** https://YOUR-USERNAME.github.io/portfolio/

## What's inside

| Path | What it is |
| --- | --- |
| `index.html` | Portfolio home page: about, projects, services with prices, order form |
| `drum-and-dial/` | Appliance repair service. Interactive repair ticket: pick an appliance and a symptom, get the likely cause, time and price, then book |
| `torque-auto/` | Car service. Odometer slider that shows which maintenance is due at a given mileage |
| `bloom-nails/` | Nail studio. Shade picker that recolours the whole page and prefills the booking form |
| `assets/` | Shared styles, scripts and the portrait photo for the home page |

The three demo sites are concept projects. Their brands, addresses and prices are made up.

## Features

- Responsive layout on Bootstrap 5.3, checked at phone and desktop widths
- Light and dark theme on every page. The toggle remembers the choice, falls back to the system setting, and avoids a flash of the wrong theme on load
- Order form on the home page with product selection, starting price shown for the chosen service, validation, spam honeypot and clear success and error messages
- Services and prices live in one config file; the service list and the form's dropdown are generated from it
- Accessibility: skip links, visible focus, labelled form fields, `aria-live` status messages, reduced-motion support, text contrast of at least 4.5:1 in both themes

## Tech

HTML5, CSS custom properties, Bootstrap 5.3.3 (CDN), Google Fonts, vanilla JavaScript. Orders are sent with [Web3Forms](https://web3forms.com).

## Run locally

No installation needed. Clone the repository and open `index.html` in a browser, or serve the folder:

```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

An internet connection is required for Bootstrap and fonts (loaded from CDNs).

## Configuration

Everything you are likely to edit is in `assets/js/config.js`.

**Receive orders by email**

1. Go to [web3forms.com](https://web3forms.com), enter the address where orders should arrive and confirm it.
2. Copy the access key from the email you receive.
3. Paste it into `accessKey` in `assets/js/config.js`.

Until a key is set, the form tells the visitor it isn't connected yet and sends nothing. Your email address is not stored in the code. The access key is public by design, as it is with any form-to-email service, so use the limits and domain restrictions in your Web3Forms dashboard.

**Services and prices**

Edit the `products` array: `name`, `from` (starting price in USD, or `null` for "let's discuss") and `note`.

## Deploy

**GitHub Pages**

1. Push the repository to GitHub.
2. Open Settings, then Pages. Choose the `main` branch and the `/ (root)` folder.
3. The site is published at `https://YOUR-USERNAME.github.io/portfolio/`.

**Netlify**

Drag the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

## Project structure

```
.
├── index.html
├── assets/
│   ├── css/portfolio.css
│   ├── js/
│   │   ├── config.js        # access key, services, prices
│   │   ├── portfolio.js     # order form, service list
│   │   └── theme.js         # dark/light toggle
│   └── img/daniil.jpg
├── drum-and-dial/           # index.html, css/, js/
├── torque-auto/             # index.html, css/, js/
└── bloom-nails/             # index.html, css/, js/
```

## Data and privacy

The order form sends the visitor's name, email and message to Web3Forms, which forwards them to the site owner. Nothing else is collected. The demo sites' forms run only in the browser and send nothing.

## Contact

Need a landing page, a small business website, or a Figma design turned into code? Use the order form on the live site.
