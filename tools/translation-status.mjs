import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "content", "public");
const draftDir = path.join(root, "content", "drafts", "translations");
const targetLanguages = ["zh", "ja"];
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const writeStubs = args.has("--write-stubs");
const json = args.has("--json");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function relativeToPublic(filePath) {
  return toPosix(path.relative(publicDir, filePath));
}

function isCanonical(relPath) {
  return !targetLanguages.some((lang) => relPath.startsWith(`${lang}/`));
}

function splitFrontmatter(source) {
  if (!source.startsWith("---\n")) {
    return { frontmatter: "", body: source };
  }
  const end = source.indexOf("\n---", 4);
  if (end === -1) {
    return { frontmatter: "", body: source };
  }
  return {
    frontmatter: source.slice(4, end).trim(),
    body: source.slice(end + 4).trimStart()
  };
}

function valueFor(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match ? match[1].trim() : null;
}

function stubFor(source, relPath, lang) {
  const { frontmatter, body } = splitFrontmatter(source);
  const title = valueFor(frontmatter, "title") ?? `"${path.basename(relPath, ".md")}"`;
  const date = valueFor(frontmatter, "date") ?? new Date().toISOString().slice(0, 10);
  const category = valueFor(frontmatter, "category") ?? `"Translation Draft"`;
  const tags = valueFor(frontmatter, "tags") ?? "[]";
  const summary = valueFor(frontmatter, "summary");

  return `---\ntitle: ${title}\ndate: ${date}\ncategory: ${category}\nstatus: draft\ntags: ${tags}\nlanguage: ${lang}\ntranslationOf: "${relPath}"${summary ? `\nsummary: ${summary}` : ""}\n---\n\nTODO: Translate this draft into ${lang} and review before moving it to content/public/${lang}/${relPath}.\n\n<!-- Source text for reference. Remove this block before publication.\n\n${body.trim()}\n-->\n`;
}

const allMarkdown = walk(publicDir).map(relativeToPublic).sort();
const canonicalFiles = allMarkdown.filter(isCanonical);
const missing = [];

for (const relPath of canonicalFiles) {
  for (const lang of targetLanguages) {
    const translatedPath = `${lang}/${relPath}`;
    if (!allMarkdown.includes(translatedPath)) {
      missing.push({ source: relPath, language: lang, expected: translatedPath });

      if (writeStubs) {
        const sourcePath = path.join(publicDir, ...relPath.split("/"));
        const draftPath = path.join(draftDir, lang, ...relPath.split("/"));
        fs.mkdirSync(path.dirname(draftPath), { recursive: true });
        if (!fs.existsSync(draftPath)) {
          fs.writeFileSync(draftPath, stubFor(fs.readFileSync(sourcePath, "utf8"), relPath, lang), "utf8");
        }
      }
    }
  }
}

if (json) {
  console.log(JSON.stringify({ missing, complete: missing.length === 0 }, null, 2));
} else if (missing.length === 0) {
  console.log("Translation status: complete. Every canonical public Markdown file has zh and ja versions.");
} else {
  console.log(`Translation status: ${missing.length} missing translation(s).\n`);
  for (const item of missing) {
    console.log(`- ${item.source} -> ${item.expected}`);
  }
  if (writeStubs) {
    console.log(`\nDraft stubs written under ${toPosix(path.relative(root, draftDir))}/.`);
  }
}

if (strict && missing.length > 0) {
  process.exitCode = 1;
}
