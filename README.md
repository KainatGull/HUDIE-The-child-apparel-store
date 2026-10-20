# HUDIE — Toddler clothing store starter

A responsive React + Vite storefront prototype for HUDIE, a pastel toddler clothing brand. Includes homepage, product grid and details, category/search/sort filters, browser-persisted cart and wishlist, a demo checkout, supporting information pages, Firebase initialization scaffold, and starter Firestore rules.

## Run locally

1. Install Node.js 20.19+ (or a current LTS version).
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite.

## Important prototype limitations

- Product photos are illustrative Unsplash placeholders; replace them with licensed HUDIE photography.
- Product catalogue is sample data in `src/data.js`; move it into Firestore before production.
- Cart and wishlist persist in the current browser via localStorage.
- Checkout is a UI demo only: it does not create orders or collect payment.
- Authentication, customer accounts, order processing, inventory validation, admin CRUD, discount validation, reviews and Cloudinary uploads are not yet implemented. Firebase initialization and starter security rules are included as scaffolding, not a complete secure backend.
- Before real launch, implement trusted server-side price/stock/discount validation, order creation in Cloud Functions, admin custom claims, Firebase App Check, tested Firestore rules, privacy/returns/shipping policies, and real payment integration. Never trust prices or totals supplied by the browser.
- `VITE_` environment variables are public to the browser. Never place private service-account credentials in Vite environment variables.

## Useful paths

- `src/styles/variables.css` — brand palette, typography and design tokens
- `src/config/storeConfig.js` — brand copy and navigation
- `src/data.js` — sample product catalogue
- `src/context/StoreContext.jsx` — cart and wishlist state
- `src/components/` — shared layout and product cards
- `src/pages/` — storefront routes
- `src/services/firebase.js` — Firebase client initialization
- `firestore.rules` — initial security-rules scaffold; review and test before deployment
- `.env.example` — environment variable names

## Current routes

`/`, `/shop`, `/product/:id`, `/cart`, `/checkout`, `/account`, `/wishlist`, `/about`, `/contact`, `/faq`, `/shipping`, `/returns`, `/size-guide`, `/privacy`, `/terms`.
