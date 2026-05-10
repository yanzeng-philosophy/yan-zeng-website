import fs from "node:fs";
import path from "node:path";
import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";

const root = process.cwd();
const slug = process.argv[2];
const password = process.env.SECRET_NOTE_PASSWORD;
const iterations = 250000;

if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: npm run secret:encrypt -- <slug>");
  console.error("Slug may contain lowercase letters, numbers, and hyphens.");
  process.exit(1);
}

if (!password || password.length < 16) {
  console.error("Set SECRET_NOTE_PASSWORD to a strong passphrase of at least 16 characters.");
  process.exit(1);
}

const sourcePath = path.join(root, "content", "secret-source", `${slug}.md`);
const outputDir = path.join(root, "public", "secret");
const outputPath = path.join(outputDir, `${slug}.json`);
const manifestPath = path.join(outputDir, "manifest.json");

if (!fs.existsSync(sourcePath)) {
  console.error(`Missing source file: ${path.relative(root, sourcePath)}`);
  process.exit(1);
}

function splitFrontmatter(source) {
  if (!source.startsWith("---\n")) {
    return { data: {}, body: source.trim() };
  }

  const end = source.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, body: source.trim() };
  }

  const frontmatter = source.slice(4, end).trim();
  const body = source.slice(end + 4).trimStart();
  const data = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (!match) continue;
    data[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }

  return { data, body: body.trim() };
}

function toBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}

fs.mkdirSync(outputDir, { recursive: true });

const source = fs.readFileSync(sourcePath, "utf8");
const { data, body } = splitFrontmatter(source);
const title = data.title || slug.replaceAll("-", " ");
const description = data.description || "Encrypted private note.";
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(password, salt, iterations, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(body, "utf8"), cipher.final()]);
const tag = cipher.getAuthTag();

const payload = {
  version: 1,
  slug,
  title,
  description,
  createdAt: new Date().toISOString(),
  kdf: {
    name: "PBKDF2",
    hash: "SHA-256",
    iterations,
    salt: toBase64(salt)
  },
  cipher: {
    name: "AES-GCM",
    iv: toBase64(iv),
    data: toBase64(Buffer.concat([encrypted, tag]))
  }
};

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : { notes: [] };

const nextNote = {
  slug,
  title,
  description,
  file: `${slug}.json`,
  updatedAt: payload.createdAt
};

manifest.notes = [
  nextNote,
  ...(manifest.notes || []).filter((note) => note.slug !== slug)
].sort((a, b) => a.slug.localeCompare(b.slug));

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`Encrypted ${path.relative(root, sourcePath)} -> ${path.relative(root, outputPath)}`);
