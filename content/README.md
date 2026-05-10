# Content Workflow

This site is designed around a small human-review loop:

1. AI may generate candidate notes into `content/drafts/`.
2. Yan reviews, edits, and removes private or unstable material.
3. Approved notes are moved into `content/public/`.
4. Only `content/public/` is rendered by the Astro site.

## Public Content

Files in `content/public/` may be rendered on the website. Every public Markdown file must include:

```yaml
---
title: "Public title"
date: 2026-05-10
category: "Research Log"
status: "public"
tags: ["AI Ethics", "Trust"]
language: "en"
summary: "Optional short summary."
---
```

`status` must be exactly `public`.

## Drafts

`content/drafts/` is for AI-generated or human-written drafts that are not rendered on the site.

Important: if this repository is public on GitHub, draft files may still be visible in the repository. For real private drafts, keep the repository private or keep drafts in a separate private workspace.

## Private Material

`content/private/` is ignored by Git and must never be used by the site. Keep raw notes, chat summaries, administrative records, and sensitive material out of the public repository.

## Publication Checklist

Before moving a file into `content/public/`, check that it does not expose:

- Visa, immigration, tax, address, housing, financial, medical, or family details.
- Raw AI chat logs.
- Private faculty, department, student, or colleague communications.
- Unpublished paper drafts unless intentionally released.
- Emotionally reactive judgments that should not become a public record.
