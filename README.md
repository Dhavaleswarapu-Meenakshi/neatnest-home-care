# NeatNest Home Care — Small Business Portfolio Website

A modern, responsive, accessible website built for **NeatNest Home Care**, a fictional residential home cleaning business.

This project was built using **plain HTML5, CSS3, and vanilla JavaScript** without build steps, node_modules, frontend frameworks, or backend databases. It is designed to serve as a portfolio demonstration for a freelance web developer presenting small-business web solutions to prospective clients.

---

## 1. What This Project Contains

- **`index.html`**: Semantic, accessible HTML5 single-page structure featuring:
  - Top portfolio demonstration notice banner.
  - Sticky navigation header with mobile drawer menu, ARIA attributes, and keyboard focus trap.
  - Distinctive editorial Hero section with high-contrast imagery, service value highlights, and primary CTAs.
  - 4 differentiated Cleaning Services cards with checklists and pre-selecting quote request links.
  - Core Service Principles ("Why Choose Us") presenting intended standards without fabricated claims.
  - Transparent 3-step consultation workflow ("How It Works").
  - Authentic About section focused on calm living spaces and eco-friendly standards.
  - Accessible FAQ accordion answering real homeowner questions.
  - Direct WhatsApp enquiry card with placeholder configuration detection.
  - Interactive Quote & Estimate form with accessible client-side validation and truthful portfolio submission feedback.
  - Comprehensive Footer with full portfolio disclaimer and back-to-top shortcut.
- **`styles.css`**: Production-quality CSS3 styling:
  - Custom design tokens for color palette (warm cream `#FAF9F5`, dark forest charcoal `#182420`, rich forest green `#234E3E`, brass accent `#C49A45`).
  - Strict WCAG AA/AAA color contrast ratios.
  - Responsive layouts tested for mobile (375px), large mobile (430px), tablet (768px), laptop (1366px), and desktop (1440px).
  - High-visibility keyboard focus rings (`:focus-visible`).
  - Motion accessibility via `@media (prefers-reduced-motion: reduce)`.
  - Print stylesheet for estimate summaries.
- **`script.js`**: Vanilla JavaScript handling:
  - Central `SITE_CONFIG` object for business settings and WhatsApp phone number.
  - Accessible mobile menu toggle with Escape key dismissal and focus restoration.
  - Service button listeners that auto-select the chosen service in the contact dropdown.
  - WhatsApp integration that detects demo placeholder numbers and displays an instructional modal instead of opening broken URLs.
  - Complete form validation with accessible error messages and honest demo result rendering.
  - Desktop scroll-spy for active navigation links.
- **`assets/`**:
  - `images/`: High-resolution, royalty-free photography stored locally for offline reliability.
  - `favicon.svg`: Custom vector SVG brand icon.

---

## 2. Technologies Used

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<details>`, `<summary>`, `<dialog>`, `<footer>`), ARIA attributes, and accessible labels.
- **CSS3**: CSS Custom Properties (Variables), Flexbox, CSS Grid, clamp() responsive typography, and media queries.
- **Vanilla JavaScript (ES6+)**: Zero external libraries or runtime dependencies.

---

## 3. How to Run the Website Locally on Windows

Because the website uses standard web technologies, it can be served using the built-in HTTP server in Python 3.12.

### Step 1: Open PowerShell or Command Prompt
Navigate to this project folder:
```powershell
cd "c:\Users\dhava\OneDrive\Desktop\Freelancing\neatnest-home-care"
```

### Step 2: Start the Local Development Server
Run the following command:
```powershell
py -3.12 -m http.server 8000
```

### Step 3: View the Website in Your Browser
Open your browser and navigate to:
```
http://localhost:8000
```
or
```
http://127.0.0.1:8000
```

### Step 4: How to Stop the Local Server
When you are finished testing, return to the PowerShell window and press:
```
Ctrl + C
```

---

## 4. File Structure & Responsibilities

| File / Folder | Role & Content |
|---|---|
| `index.html` | Page structure, text content, meta tags, and accessibility markup |
| `styles.css` | All styling, design tokens, layout grids, responsive breakpoints, animations |
| `script.js` | Business configuration, mobile navigation, WhatsApp logic, form validation |
| `assets/images/` | Locally stored home interior and service photography |
| `assets/favicon.svg` | Custom vector SVG brand favicon |
| `README.md` | Local setup, configuration guide, client adaptation instructions |

---

## 5. How to Configure the WhatsApp Number

The WhatsApp integration is controlled by a single configuration object at the top of **`script.js`**:

```javascript
const SITE_CONFIG = {
  businessName: 'NeatNest Home Care',
  
  // Replace this with your client's real phone number:
  whatsappNumber: '91XXXXXXXXXX',

  defaultWhatsAppMessage: 'Hello NeatNest Home Care! I would like to request an estimate for residential cleaning services for my home.',
  isDemoMode: true
};
```

### Demo Mode Behavior vs. Live Number Behavior
- **While set to `91XXXXXXXXXX` (or any placeholder with 'X')**:
  Clicking the "Connect via WhatsApp" button opens an accessible modal dialog explaining that WhatsApp is currently in demo mode and instructs the user how to configure a real number. It never launches broken URLs or attempts to message an invalid recipient.
- **When updated with a valid international number** (e.g. `'919876543210'` or `'14155552671'`):
  Clicking the button immediately opens `https://wa.me/<number>?text=<message>` in a secure new browser tab (`target="_blank" rel="noopener noreferrer"`).

---

## 6. Form Submission & Client Launch Integration

### Why doesn't the form send a real email right now?
In this portfolio prototype, the estimate request form performs full client-side validation (verifying name length, email format, selected services, and message length).

To maintain absolute honesty and avoid misleading visitors or prospective clients, **it does not pretend a message was delivered to an actual business**. Instead, it renders an explicit **Portfolio Demo Feedback Card** displaying the captured fields and confirming that client-side validation passed.

### How to connect this form to a real service for a paying client:
For a production deployment without a custom backend server, you can connect the form in `index.html` to any free or low-cost static form service in under 5 minutes:

#### Option A: Formspree (Free tier available)
1. Sign up at [formspree.io](https://formspree.io).
2. Create a form and copy your endpoint URL (e.g., `https://formspree.io/f/xyzabcde`).
3. In `index.html`, update `<form id="quote-form">`:
   ```html
   <form id="quote-form" action="https://formspree.io/f/xyzabcde" method="POST">
   ```
4. In `script.js`, replace the demo feedback handling with standard `fetch()` or allow default form submission.

#### Option B: Netlify Forms (Zero code required on Netlify)
If hosting on Netlify, add `data-netlify="true"` to `<form>`:
```html
<form id="quote-form" name="quote-enquiries" method="POST" data-netlify="true">
```
Netlify automatically captures submissions and sends email notifications.

#### Option C: EmailJS or Web3Forms
- [Web3Forms](https://web3forms.com): Paste an access key into a hidden input field.
- [EmailJS](https://www.emailjs.com): Send directly to Gmail or Outlook using client-side JavaScript.

---

## 7. Client Handoff Checklist (Adapting for a Real Client)

Before launching this website for a real small-business owner:
1. **Business Identity**:
   - Update business name, logo, and slogan in `index.html`, `styles.css`, and `script.js`.
2. **Contact Coordinates**:
   - Set real WhatsApp number in `SITE_CONFIG.whatsappNumber`.
   - Update consultation email address and operating hours in `#contact`.
3. **Service Details**:
   - Customize the 4 service cards with your client’s actual offerings, service areas, and local cleaning packages.
4. **Form Backend**:
   - Connect the contact form to Formspree, Netlify Forms, or client email inbox.
5. **Demonstration Banners**:
   - Remove or hide the top portfolio banner (`.portfolio-banner`) and the footer demo disclaimer box (`#disclaimer`).
6. **Domain & SSL**:
   - Link client's custom domain (e.g., `www.clientcleaning.com`) with an automatic HTTPS certificate.

---

## 8. Free or Low-Cost Static Hosting Options

Because this site consists of static HTML, CSS, JavaScript, and images, it can be hosted for **free** on:

1. **GitHub Pages**:
   - Push repository to GitHub.
   - Go to **Settings > Pages > Branch: main / root**.
   - Your site is live at `https://<username>.github.io/<repo-name>/`.
2. **Netlify**:
   - Drag and drop this folder directly into the Netlify Drop dashboard at [app.netlify.com/drop](https://app.netlify.com/drop).
   - Free custom domain support and automatic SSL.
3. **Cloudflare Pages**:
   - Connect repository or upload folder via Cloudflare Pages dashboard for fast global CDN delivery.
4. **Vercel**:
   - Run `npx vercel` or connect via GitHub for instant edge deployment.
