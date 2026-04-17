# 1CL Collection Hub

The Intelligence Business Hub & 4D Sovereign Collection App for **1CL**.

## Architecture & Tech Stack
- **Framework:** React + Vite + TypeScript.
- **Styling:** TailwindCSS (Custom Gold/Chrome Sovereign theme).
- **Animations:** Framer Motion.
- **Data Source:** `public/data/catalog.json`.

## Managing the Catalog
The catalog is the Single Source of Truth for the application. To add or modify products, edit `public/data/catalog.json`.

**JSON Format Example:**
```json
{
  "id": "VST-NEW",
  "name": "New Jacket Name",
  "collection": "Workshop Edition",
  "type": "jacket",
  "color": "black",
  "variants": [
    { "id": "VST-NEW-GOLD", "logo": "gold", "image": "/images/PNG/jacket-gold.png" },
    { "id": "VST-NEW-CHROME", "logo": "chrome", "image": "/images/PNG/jacket-chrome.png" }
  ]
}
```

## Deployment
This application is configured for automatic deployment to GitHub Pages via GitHub Actions.
1. Push your changes to the `main` or `master` branch.
2. The Action located in `.github/workflows/deploy.yml` will automatically build the static files and deploy them.
3. Make sure GitHub Pages settings in your repository are set to deploy from GitHub Actions.
