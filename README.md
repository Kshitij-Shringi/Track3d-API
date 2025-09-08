# Track3D Docs (GitBook legacy)

This repo uses GitBook (legacy CLI) to build static pages with a sidebar, custom fonts/colors, and a copy button on code blocks.

## Node version

GitBook 3 requires Node 16. An `.nvmrc` is provided.

```bash
# if you use nvm
nvm use
# or install if missing
nvm install 16 && nvm use 16
```

## Local preview

1. Install Node.js LTS 16 (see above).
2. Install GitBook CLI and plugins:

```bash
npm install -g gitbook-cli
# install plugins locally
gitbook install
```

3. Serve locally at http://localhost:4000

```bash
gitbook serve
```

## Structure

- `book.json`: GitBook config (plugins, styles)
- `SUMMARY.md`: Sidebar navigation
- `styles/website.css`: Custom design to match brand
- `API Docs/Track3D API Endpoints.md`: Main content

## GitHub Pages deploy

This repo includes a GitHub Actions workflow that builds the book on pushes to `main` and publishes to GitHub Pages.

Setup steps:
- In GitHub, enable Pages: Settings → Pages → Build and deployment → "GitHub Actions".
- Ensure Actions are enabled for the repo.

On the next push to `main`, the site will be available at your repo’s Pages URL.

---

# Track3D Docs (MkDocs Material)

This repo is configured for MkDocs Material: modern, maintained, with built-in copy buttons and a left sidebar.

## Local preview

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install mkdocs-material
mkdocs serve
```
Open http://127.0.0.1:8000

## Structure

- `mkdocs.yml`: Site config, nav (sidebar), theme, copy button feature
- `API Docs/Track3D API Endpoints.md`: Main content (referenced in nav)
- `docs/styles/extra.css`: Custom colors/fonts override

## Customize colors/fonts
- Tweak `docs/styles/extra.css` and `theme.palette` in `mkdocs.yml`.
- Copy buttons are enabled via `theme.features: [content.code.copy]`.

## GitHub Pages deploy
A workflow `Deploy MkDocs to GitHub Pages` builds and deploys on push to `main`.
- In GitHub → Settings → Pages: set Source to GitHub Actions
- Push to `main`, the site will publish automatically.

---

Legacy GitBook config is still present but MkDocs is recommended to avoid Node version issues.

# Track3D Docs (Plain GitHub Pages)

This site is a static HTML page with a sidebar, your colors/fonts, and copy buttons for code blocks. It renders `API Docs/Track3D API Endpoints.md` using marked.js on the client.

## Local preview

Just open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Commit and push this repo to GitHub.
2. In GitHub → Settings → Pages:
   - Build and deployment: "Deploy from a branch"
   - Branch: `main` (or `gh-pages` if you prefer) and `/ (root)`
3. Save. Your site will be published at the Pages URL shown.

No build step required.
