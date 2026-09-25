# Website project

This is the website for MoonMade, a handmade bag brand. It is a simple static website (plain HTML + CSS, no build step) hosted free on GitHub Pages.
Every push to the `main` branch automatically updates the live site within about a minute.

- `index.html` is the page content
- `style.css` holds colors, fonts and layout (colors and fonts are set at the top in `:root`)
- `images/` is where photos and logos go

## Guidelines for Claude
- The person editing may not be technical. Explain changes in plain language and avoid jargon.
- Keep it plain HTML/CSS. Don't add frameworks, build tools or npm packages unless asked.
- Keep the site mobile-friendly.
- When asked to "publish", "push" or "make it live": commit with a clear message, run `git push`,
  then tell the user the site will update at the live URL in about a minute.
- Before making changes, run `git pull` so you have the latest version.

## Design direction
- Clean, chic and minimal (inspired by le-febour.com): serif type, near-black on white/warm gray,
  small uppercase labels with wide letter-spacing, lots of white space, square product photos.
- Subtle moon/astrology touches (crescent logo, moon-phase divider). Keep them understated.
- Brand colors and fonts live in the `:root` block at the top of `style.css`.
- Product photos go in `images/`. Instructions for swapping a placeholder for a photo are in a comment above the product grid in `index.html`.

## Order form
- `order.html` is the order form. Orders are emailed to the owner through FormSubmit.co (free, no account).
- The receiving email is `ORDER_EMAIL` near the bottom of `order.html`. The first order after changing it triggers an activation email that must be clicked once.
- The bags, prices and colours offered on the form are in `PRODUCTS` in `order.html`. When a bag is added or changed in the Shop section of `index.html`, update `PRODUCTS` to match.
