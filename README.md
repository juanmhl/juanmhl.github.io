# Personal Academic Website

This is a static personal academic website built with [Astro](https://astro.build). All content is stored in Markdown files so you can edit it without touching any code.

---

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

3. Build the static site:
   ```bash
   npm run build
   ```
   The output goes to the `dist/` folder.

---

## How to edit content

All content lives in `.md` files inside `src/content/`. You never need to edit `.astro` files to update your site.

### Pages and their content files

| Page | Content file |
|------|-------------|
| About | `src/content/about/about.md` |
| Research | `src/content/research/research.md` |
| Contact | `src/content/contact/contact.md` |
| Publications | `src/content/publications/*.md` (one file per paper) |
| Projects intro | `src/content/projects-page/projects-page.md` |
| Projects | `src/content/projects/*.md` (one file per project) |
| Blog | `src/content/blog/*.md` (one file per post) |

### Frontmatter

Every `.md` file starts with frontmatter between `---` lines. This is metadata that controls how the content is displayed.

**`src/content/about/about.md`**
```yaml
---
title: "About"
scholar: "https://scholar.google.com"
github: "https://github.com"
email: "juan.herrera@example.edu"
cv: "/cv.pdf"
researchgate: "https://www.researchgate.net"
linkedin: "https://www.linkedin.com"
orcid: "https://orcid.org"
uni: "https://www.university.edu"
---
```

- `scholar`, `github`, `email`, `cv` — required
- `researchgate`, `linkedin`, `orcid`, `uni` — optional. Omit any you don't use.

**`src/content/publications/pub-2024-example.md`**
```yaml
---
title: "Your Paper Title"
year: 2024
venue: "Conference Name"
authors: "Your Name, Coauthor Name"
url: "https://arxiv.org/abs/2401.00001"
order: 1
website: "https://project-page.example.com"
repo: "https://github.com/yourname/project"
---
```

- `url` — the link the paper title will point to (arXiv, DOI, project page, etc.)
- `order` — optional number for sorting papers within the same year. Lower numbers appear first. Defaults to `0`.
- `website` — optional link to a project webpage or demo
- `repo` — optional link to the code repository

The body text below the frontmatter is rendered as a reduced abstract on the publications page.

**`src/content/projects-page/projects-page.md`**
```yaml
---
title: "Projects"
---
```

The body text below the frontmatter is rendered as an intro paragraph between the page title and the projects grid.

**`src/content/projects/my-project.md`**
```yaml
---
title: "Project Title"
order: 1
---
```

- `order` — optional number for sorting projects on the grid. Lower numbers appear first. Defaults to `0`.

**`src/content/blog/hello-world.md`**
```yaml
---
title: "Post Title"
date: 2024-01-15
description: "Short description shown in the blog list"
---
```

---

## How to add a new publication

1. Create a new file in `src/content/publications/`, for example `pub-2024-new-paper.md`.
2. Add frontmatter with `title`, `year`, `venue`, `authors`, and `url` (link to arXiv, DOI, or project page).
3. Optionally add `order: 1` for custom sorting within the same year.
4. Optionally add `website` and/or `repo` links. These appear below the authors.
5. Write a reduced abstract below the frontmatter. This will appear on the publications page.
6. Rebuild the site.

The publications page sorts papers by year (newest first), then by `order` within each year.

---

## How to add a new blog post

1. Create a new file in `src/content/blog/`, for example `my-new-post.md`.
2. Add frontmatter with `title`, `date` (format: `YYYY-MM-DD`), and `description`.
3. Write your post content in Markdown below the frontmatter.
4. Rebuild the site.

The blog list page automatically sorts posts by date (newest first).

---

## How to add a new project

1. Create a new file in `src/content/projects/`, for example `my-project.md`.
2. Add frontmatter with `title` and optionally `order`.
3. Write the project description in Markdown below the frontmatter.
4. Rebuild the site.

The projects grid is sorted by `order` ascending — lower numbers appear first.

---

## How to change your name

Your name appears in the top-left of the navigation bar. To change it, edit line 25 in `src/components/Nav.astro`:

```astro
<a href="/about" class="name">Juan María Herrera-López</a>
```

Replace the text between the tags with your name.

---

## How to change your site URL

Edit `astro.config.mjs` and update the `site` field:

```js
export default defineConfig({
  output: 'static',
  site: 'https://juanmhl.github.io'
});
```

---

## How to update your CV

Replace `public/cv.pdf` with your actual CV PDF file. The about page links to it automatically.

---

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and deploys the site automatically.

1. Push this repository to GitHub.
2. Go to **Settings → Pages** in your repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The workflow will run automatically on the next push to `main`.

The site will be live at `https://juanmhl.github.io`.

## Deploy to Netlify (alternative)

1. Push this repository to GitHub.
2. Go to [netlify.com](https://netlify.com) and log in.
3. Click **Add new site** → **Import an existing project**.
4. Select your GitHub repository.
5. Netlify auto-detects Astro. The build command is `npm run build` and the publish directory is `dist`.
6. Click **Deploy site**.

Netlify will rebuild and redeploy your site automatically every time you push changes to GitHub.

---

## File cheat sheet

| If you want to change... | Edit this file... |
|--------------------------|-------------------|
| Your bio text | `src/content/about/about.md` |
| Your email, Scholar, GitHub links | `src/content/about/about.md` frontmatter |
| Your CV file | Replace `public/cv.pdf` |
| Research lines text | `src/content/research/research.md` |
| Contact text | `src/content/contact/contact.md` |
| Add/remove/edit publications | Files in `src/content/publications/` |
| Projects page intro text | `src/content/projects-page/projects-page.md` |
| Add/remove/edit projects | Files in `src/content/projects/` |
| Add/remove/edit blog posts | Files in `src/content/blog/` |
| Your name in the nav | `src/components/Nav.astro` line 25 |
| Colors or fonts | `src/layouts/Layout.astro` `<style>` block |
| Site URL | `astro.config.mjs` |

---

## What is Astro?

Astro is a static site builder. It takes your `.md` content files and `.astro` page templates and generates plain HTML files that can be served anywhere. You do not need to learn Astro to use this site — just edit the `.md` files and rebuild.

---

## License

This project is released into the public domain under [CC0 1.0 Universal](LICENSE). You can copy, modify, distribute, and use it for any purpose without asking permission or providing attribution.

---

## Acknowledgment

This site was vibe coded with [OpenCode](https://opencode.ai) and [Kimi K2.6](https://www.moonshot.cn/).