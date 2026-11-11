# Richard A T — Portfolio

A responsive personal portfolio built with React, TypeScript, Vite, and Lucide icons.

## Features

- Clean dark theme with a single mint accent and one shared layout grid.
- Sticky navigation with active-section highlighting and an accessible mobile menu.
- Project previews for CareerPilot AI, CreditBridge, and Customer Churn Analytics.
- Skills, experience, education, certifications / learning, and contact sections.
- Reduced-motion support and keyboard-accessible navigation.
- Deployment configuration for Vercel, Netlify, and GitHub Pages.

## Requirements

- Node.js 22 (Node.js 20.19+ is also suitable for the configured Vite version)
- npm

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Validate and build

```bash
npm run typecheck
npm run build
npm run preview
```

The production build is written to `dist/`.

## Deploy publicly

### Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the framework as **Vite**.
4. Set Build Command to `npm run build` and Output Directory to `dist` (the included `vercel.json` already defines these settings).
5. Deploy. Future pushes to the connected branch will trigger deployments.

### Netlify

1. Import the GitHub repository into Netlify.
2. The included `netlify.toml` configures `npm run build` and publishes `dist`.
3. Deploy the site.

### GitHub Pages

1. Push the repository to the `main` or `master` branch.
2. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
3. The workflow at `.github/workflows/deploy.yml` builds and deploys the site on pushes to `main` or `master`.

The Vite base is set to `./` so generated assets can be hosted at a domain root or under a GitHub Pages project path.

## Personal details to verify before publishing

- Confirm the Elewayte internship dates and add them to the experience entry if desired. The portfolio deliberately omits a year because earlier resume drafts contained conflicting years.
- Check that the LinkedIn and GitHub URLs are the intended public profiles.
- The IBM SkillsBuild prompt-engineering item is listed as a learning module, not as an issued certificate. Change its label only after the platform issues the credential.
- Add a resume PDF to `public/` and add a download link in the contact or hero section only after checking that the PDF is the final version.
- Verify each linked GitHub repository is public and its displayed content matches the project summary.

## Editing content

Most portfolio content is maintained in `src/App.tsx`:

- `projects` — project cards, descriptions, stacks, and repository links.
- `skillGroups` — skills grouped by discipline.
- `experience` — internship details.
- `certifications` and `learning` — credentials and active learning.
- `navigation` — header links.

Visual styles, responsive breakpoints, and animation keyframes live in `src/index.css`.
