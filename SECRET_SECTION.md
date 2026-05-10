# Secret Section Workflow

The site includes a static encrypted section at `/secret/`.

Important limits:

- The GitHub Pages site and repository are public.
- Never commit plaintext secret material.
- The published files in `public/secret/` are encrypted JSON payloads.
- Anyone can download the encrypted payloads, so use a long, unique password.
- This is suitable for low-risk private writing for trusted friends, not for high-risk personal records.

## Create A Secret Note

Create a local Markdown file:

```text
content/secret-source/friends.md
```

Optional frontmatter:

```markdown
---
title: "For Close Friends"
description: "A private note for people I trust."
---

Your secret content here.
```

Encrypt it:

```powershell
$env:SECRET_NOTE_PASSWORD="use-a-long-private-passphrase"
npm run secret:encrypt -- friends
Remove-Item Env:\SECRET_NOTE_PASSWORD
```

Then commit and push:

```powershell
git add public/secret/manifest.json public/secret/friends.json
git commit -m "Add encrypted friends note"
git push
```

Share:

- URL: `https://yanzeng-philosophy.github.io/yan-zeng-website/secret/`
- Note: `friends`
- Password: the passphrase you used
