# Secret Source Notes

Put plaintext secret notes in this local folder only. Markdown files in this folder are ignored by git and must not be committed.

To publish an encrypted note:

1. Create a local file such as `content/secret-source/friends.md`.
2. Set a strong password in your shell for this one command.
3. Run:

```powershell
$env:SECRET_NOTE_PASSWORD="use-a-long-private-passphrase"
npm run secret:encrypt -- friends
Remove-Item Env:\SECRET_NOTE_PASSWORD
```

The command writes encrypted output to `public/secret/friends.json` and updates `public/secret/manifest.json`.

Only share the `/secret/` URL and the password with people you trust. Do not use this for high-risk secrets such as identity documents, financial details, medical details, account passwords, or immigration/legal records.
