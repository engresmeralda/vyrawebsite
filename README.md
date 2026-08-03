# VYRA — Engineering Tomorrow's Digital Experiences

A fully responsive, multi-page marketing website for **VYRA**, a fictional premium AI / cloud / software engineering studio. Built with vanilla **HTML5, CSS3, and JavaScript (ES6+)** — no frameworks, no build step.

**Live demo:** _add your deployed URL here after publishing (Netlify / GitHub Pages / Vercel)_

---

## Pages

| Page | File | Highlights |
|---|---|---|
| Home | `index.html` | Animated canvas hero, trusted-by marquee, stats counters, testimonial slider, CTA banner |
| Services | `services.html` | 10 expandable service cards |
| Portfolio | `portfolio.html` | Category filtering (JS) + project detail modal |
| Pricing | `pricing.html` | Monthly/yearly toggle, comparison table, FAQ accordion |
| Team | `team.html` | Bio popup modal, company milestone timeline |
| Blog | `blog.html` | Featured article, live client-side search, category filters, sidebar |
| Contact | `contact.html` | Validated enquiry form, embedded Google Map, animated success state |
| 404 | `404.html` | On-brand error page |

Every page shares a sticky glassmorphism navbar (with mobile slide-out menu) and a multi-column footer with newsletter sign-up.

## Tech & structure

```
/index.html
/services.html
/portfolio.html
/pricing.html
/team.html
/blog.html
/contact.html
/404.html
/css/
  main.css      → design tokens, base styles, nav, footer, shared components
  pages.css     → page-specific layouts (services, portfolio, pricing, team, blog, contact, 404)
/js/
  main.js       → loader, nav, canvas neural-network hero animation, scroll reveal,
                  counters, cursor glow, ripple effects, toasts, lazy loading, tilt
  components.js → testimonial slider, FAQ accordion (shared across pages)
  portfolio.js  → category filtering + modal
  pricing.js    → monthly/yearly toggle
  contact.js    → form validation, success state, newsletter validation
  blog.js       → client-side search & category filtering
  team.js       → bio popup modal
/icons/
  favicon.svg   → brand "V" mark
```

## Interactive JavaScript features

Sticky/glass navbar · mobile hamburger menu · scroll progress bar · active nav highlighting · canvas-based animated neural network hero · scroll-triggered reveal animations · animated counters · testimonial slider · FAQ accordion · portfolio filtering + modal · pricing monthly/yearly toggle · contact form validation with inline errors · toast notifications · newsletter validation · back-to-top button · lazy-loaded images · loading screen · cursor glow · button ripple effect · card tilt on hover · blog search.

## Design system

- **Colors:** deep black `#050505`, rich purple `#120B2C`, accent purple `#8A2BE2`, neon blue `#00D9FF`, electric blue `#3A8DFF`, soft white `#F5F7FA`, light gray `#A0AEC0`.
- **Type:** Sora / Space Grotesk for headings, Inter for body — loaded from Google Fonts.
- **Components:** glassmorphism cards with gradient borders, glow shadows, and hover lift.

## Accessibility & performance

- Semantic HTML5 landmarks, skip-to-content link, visible focus states.
- `prefers-reduced-motion` respected across all animations (canvas, reveals, smooth scroll).
- Lazy-loaded images via `IntersectionObserver`.
- Responsive layout using CSS Grid, Flexbox, `clamp()`, and mobile-first media queries — tested at mobile, tablet, and desktop breakpoints.

## Running locally

No build step required. From the project folder:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

or simply open `index.html` directly in a browser.

## Deployment

This is a static site and can be deployed as-is to:

- **Netlify:** drag-and-drop the folder, or connect the GitHub repo (build command: none, publish directory: `/`).
- **GitHub Pages:** push to a repo, enable Pages on the `main` branch, root directory.
- **Vercel:** import the GitHub repo as a static project (no framework preset needed).

## Notes

- The Google Map on the Contact page uses a public `google.com/maps` embed URL (no API key required).
- All portfolio, team, and blog content is placeholder copy for a fictional company — replace with real content before production use.
