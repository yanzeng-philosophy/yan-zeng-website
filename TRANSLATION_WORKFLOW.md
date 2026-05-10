# Translation Workflow

The site uses a static, review-first translation workflow.

## Canonical Rule

English Markdown files are canonical:

```text
content/public/research/example.md
content/public/essays/example.md
content/public/life/example.md
content/public/now/example.md
```

Chinese and Japanese translations use the same relative path under a language folder:

```text
content/public/zh/research/example.md
content/public/ja/research/example.md
```

Each translation should include:

```yaml
language: "zh"
translationOf: "research/example.md"
```

or:

```yaml
language: "ja"
translationOf: "research/example.md"
```

## Just-in-Time Translation Loop

1. Add or approve the English canonical Markdown file.
2. Run:

```bash
npm run translation:status
```

3. If translations are missing, ask Codex to translate the listed files into Chinese and Japanese while preserving frontmatter meaning and privacy rules.
4. Add reviewed translations under `content/public/zh/` and `content/public/ja/`.
5. Run:

```bash
npm run translation:strict
```

6. Commit and deploy.

## Draft Stubs

To create local draft stubs for missing translations:

```bash
npm run translation:stubs
```

This writes files under:

```text
content/drafts/translations/
```

These files are drafts. Review and move them into `content/public/zh/` or `content/public/ja/` only after they are ready to publish.

## Privacy Rule

Do not translate private drafts directly into public content. Translation is still publication. Every translated file must pass the same privacy and accuracy review as the original.
