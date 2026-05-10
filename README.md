# Yan Zeng Personal Website

Minimal Astro + Markdown personal academic website.

## What This Version Includes

- Home, About, CV, Research, Papers, Blog, Life, and Now pages.
- Markdown content loaded only from `content/public/`.
- Draft and private folders for a human-reviewed writing workflow.
- `AGENTS.md` with privacy, content, and style rules for Codex.
- GitHub Pages deployment workflow under `.github/workflows/deploy.yml`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the built site:

```bash
npm run preview
```

## Content Workflow

Use this loop:

1. Generate or write candidate notes in `content/drafts/`.
2. Review for privacy, accuracy, tone, and publication readiness.
3. Move approved notes into `content/public/`.
4. Set frontmatter `status: public`.
5. Commit and deploy.

Only `content/public/` is read by Astro. Drafts and private files are not rendered.

Important: if the GitHub repository is public, files in `content/drafts/` may still be visible on GitHub. Keep real drafts in a private repository or local-only workspace unless they are safe to expose.

## Public Post Frontmatter

Every public post should use this shape:

```yaml
---
title: "Title"
date: 2026-05-10
category: "Research Log"
status: "public"
tags: ["AI Ethics", "Trust"]
language: "en"
summary: "Short optional summary."
---
```

## GitHub Pages Setup

1. Create a GitHub repository, for example `yan-zeng-website`.
2. Push this project to the repository.
3. In GitHub, go to Settings -> Pages.
4. Set Source to GitHub Actions.
5. Update `astro.config.mjs`:
   - `site`: your GitHub Pages origin, for example `https://yan-zeng.github.io`.
   - `base`: your repository name, for example `/yan-zeng-website`.
6. Push to `main`.

For a custom domain or a user site at `username.github.io`, set `base` to `/`.

## Replace Before Launch

- Replace `public/cv.pdf` with the reviewed public CV.
- Replace placeholder biography and papers content.
- Review the sample public posts and remove anything you do not want published.
