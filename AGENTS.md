# Agent Context — Personal Academic Website

## Project Overview

Static personal academic website built with **Astro 5.x**, `output: 'static'`. All page content lives in Markdown files inside `src/content/` so the researcher can edit text without touching code.

## Tech Stack

- **Framework:** Astro 5.x
- **Output:** Static (`output: 'static'`)
- **Content:** Astro Content Collections with Zod schemas
- **Styling:** Scoped CSS in `.astro` files + global CSS in `Layout.astro`
- **Fonts:** Space Mono (headings, nav, metadata) + Inter (body text) from Google Fonts
- **No external CSS frameworks** (no Tailwind, no React)

## Design System (Strict)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#080808` | Page background |
| Text | `#f2f2f2` | Body text |
| Accent | `#ffffff` | Headings, links, active nav |
| Muted | `rgba(242,242,242,0.4)` | Inactive nav, metadata, descriptions |
| Separator | `rgba(255,255,255,0.1)` | `1px` horizontal rules only |
| Nav border | `rgba(255,255,255,0.08)` | Bottom border on fixed nav |

**Rules:**
- Zero border-radius, zero gradients, zero shadows, zero decorative elements
- All decoration is typographic: brackets `[ ]`, dashes `—`, slashes `//`
- Section separators are `1px solid` horizontal rules only
- `Space Mono` for structural elements (nav, headings, metadata labels)
- `Inter` for body text (paragraphs, abstracts, descriptions)

## Content Collections

All collections defined in `src/content/config.ts`:

| Collection | Files | Schema |
|------------|-------|--------|
| `about` | `about/about.md` | `title, scholar, github, email, cv` + optional `researchgate, linkedin, orcid, uni` |
| `research` | `research/research.md` | `title` |
| `contact` | `contact/contact.md` | `title, email` |
| `publications` | `publications/*.md` | `title, year, venue, authors, url, order` + optional `website, repo` |
| `projects` | `projects/*.md` | `title, order` |
| `projects-page` | `projects-page/projects-page.md` | `title` |
| `blog` | `blog/*.md` | `title, date, description` |

**Important:** Single-item collections (`about`, `research`, `contact`) must live in subdirectories (`about/about.md`, not `about.md`).

## File Structure

```
src/
  components/
    Nav.astro              # Fixed top bar, active page highlight
  layouts/
    Layout.astro           # Global shell: fonts, CSS vars, fade-in, main sizing
  pages/
    index.astro            # About content (homepage)
    about.astro
    research.astro
    publications.astro
    projects.astro
    blog.astro             # Post list
    blog/[slug].astro      # Individual post
    contact.astro
  content/
    config.ts              # Collection schemas
    about/about.md
    research/research.md
    contact/contact.md
    publications/*.md
    projects-page/projects-page.md
    projects/*.md
    blog/*.md
```

## Layout Width System

Shared CSS custom properties in `Layout.astro`:
```css
--content-max: 830px;
--content-pad: 24px;
```

Both `main` and `.nav-inner` use:
- `width: 100%`
- `max-width: var(--content-max)`
- `margin: 0 auto`
- `padding: 0 var(--content-pad)`

`html` has `overflow-y: scroll` to prevent scrollbar-width layout shift between fixed nav and scrolling content.

## Sorting Logic

**Publications:**
```js
publications.sort((a, b) => {
  if (b.data.year !== a.data.year) return b.data.year - a.data.year;
  return a.data.order - b.data.order;
});
```

**Projects:**
```js
projects.sort((a, b) => a.data.order - b.data.order);
```

**Blog:**
```js
posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
```

## Rendering Content

Astro Content Collections require explicit rendering:

```astro
---
import { getCollection, render } from 'astro:content';
const items = await getCollection('blog');
const rendered = await Promise.all(
  items.map(async (item) => {
    const { Content } = await render(item);
    return { ...item, Content };
  })
);
---

{rendered.map(item => <item.Content />)}
```

## Adding a New Page

1. Create `.astro` file in `src/pages/`
2. Import `Layout` and `Nav`
3. Fetch content via `getCollection()`, `getEntry()`, or `render()`
4. Wrap in `<Layout title="...">` and `<main>`

For a new content collection:
1. Define schema in `src/content/config.ts`
2. Create directory under `src/content/`
3. Add Markdown files with matching frontmatter

## Build & Deploy

```bash
npm install
npm run dev     # localhost:4321
npm run build   # Output to dist/
```

**Deploy to Netlify:**
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`

## User Is a Beginner

The person using this site knows nothing about Astro. All content edits happen in `.md` files only. The `README.md` explains which files to edit for each change. When modifying schemas or adding fields, update the README frontmatter examples.

## Common Patterns

- **Optional fields:** Use `.optional()` in Zod schema + conditional rendering in Astro
- **Conditional rendering:** `{field && <element />}` or `{field ? <a /> : null}`
- **External links:** Always include `target="_blank" rel="noopener"`
- **Typography:** Metadata labels = Space Mono, values/body = Inter