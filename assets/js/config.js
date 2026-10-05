// Settings you can edit without touching the rest of the site.
window.PORTFOLIO_CONFIG = {
  // 1) Open https://web3forms.com, enter the email where orders should arrive, get your access key.
  // 2) Paste the key between the quotes below.
  accessKey: "PASTE_YOUR_ACCESS_KEY_HERE",

  // Services shown on the page and in the order form.
  // "from" is the starting price in USD. Use null for "let's discuss".
  products: [
    {
      id: "landing",
      name: "Landing page",
      from: 120,
      note: "One page with the main offer, services, contacts and a request form. Works on phone and desktop."
    },
    {
      id: "site",
      name: "Small business website, up to 5 pages",
      from: 300,
      note: "Home, services, prices, about and contacts, in one consistent design."
    },
    {
      id: "figma",
      name: "Figma layout to responsive HTML and CSS",
      from: 100,
      note: "You have a design. I turn it into clean, responsive code."
    },
    {
      id: "fix",
      name: "Fixes and improvements to an existing site",
      from: 30,
      note: "Mobile layout, forms, spacing, small new blocks."
    },
    {
      id: "other",
      name: "Something else, let's discuss",
      from: null,
      note: "Describe the task and I'll tell you if I can help and what it costs."
    }
  ]
};
