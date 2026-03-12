# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Pure HTML/CSS personal blog, no build tools, no static site generator, no frameworks. Hosted on GitHub Pages at `antoine-de-daran.github.io`.

## Development

Preview locally with any static file server:

```sh
python3 -m http.server 8000
# or
npx serve .
```

No build step, no dependencies, no package.json. Edit HTML/CSS/JS directly.

## Architecture

- **Pages**: `index.html`, `about.html`, `projects.html`, `faq.html`, `blog/index.html`, `blog/posts/*.html`
- **Styling**: Single CSS file `css/style.css` with CSS custom properties for light/dark theming (`.dark` class on `<html>`)
- **JS**: Single file `js/main.js` (IIFE) handles dark mode toggle (localStorage + OS preference) and smooth anchor scrolling
- **Assets**: `assets/favicon.svg` (SVG monogram), `assets/og-image.png` (1200x630 OG image)
- **RSS**: `feed.xml` at root, manually maintained

## Writing

All written content (page copy, blog posts, descriptions) must follow the guidelines in @TONE.md. Read it before writing or editing any text.

## Conventions

### Asset paths

- Root-level pages (`index.html`, `about.html`, etc.) use absolute paths: `/css/style.css`, `/js/main.js`
- `blog/index.html` uses relative paths: `../css/style.css`, `../js/main.js`
- `blog/posts/*.html` uses relative paths: `../../css/style.css`, `../../js/main.js`
- Favicon and RSS links always use absolute paths (`/assets/favicon.svg`, `/feed.xml`)

### Shared page structure

Every page includes the same nav, footer, GoatCounter script, and OG/Twitter meta tags. When adding or changing these shared elements, update all pages. The nav links are: Home, Blog, Projects, About, FAQ, plus the theme toggle button.

### Adding a new blog post

1. Create `blog/posts/<slug>.html` using relative CSS/JS paths
2. Add `<li>` entry to `blog/index.html` post list
3. Add `<li>` entry to the "Recent Writing" section on `index.html`
4. Add `<item>` to `feed.xml` and update `<lastBuildDate>`
5. Use `og:type="article"` (other pages use `og:type="website"`)

### OG meta tags

All pages carry `og:title`, `og:description`, `og:url`, `og:image`, and `twitter:card` / `twitter:title` / `twitter:description`. Base URL: `https://antoine-de-daran.github.io`.

### Analytics

GoatCounter snippet at the bottom of every page. The subdomain is `antoine-de-daran`.
