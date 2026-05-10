export type Lang = "en" | "zh" | "ja";
export type PageKey = "home" | "about" | "cv" | "research" | "papers" | "blog" | "life" | "now";

export const siteBase = "https://yanzeng-philosophy.github.io/yan-zeng-website/";
export const localizedLangs: Lang[] = ["zh", "ja"];

export const languages: Record<Lang, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  zh: { label: "中文", short: "中" },
  ja: { label: "日本語", short: "日" }
};

export const pagePaths: Record<PageKey, Record<Lang, string>> = {
  home: { en: "/", zh: "/zh/", ja: "/ja/" },
  about: { en: "/about/", zh: "/zh/about/", ja: "/ja/about/" },
  cv: { en: "/cv/", zh: "/zh/cv/", ja: "/ja/cv/" },
  research: { en: "/research/", zh: "/zh/research/", ja: "/ja/research/" },
  papers: { en: "/papers/", zh: "/zh/papers/", ja: "/ja/papers/" },
  blog: { en: "/blog/", zh: "/zh/blog/", ja: "/ja/blog/" },
  life: { en: "/life/", zh: "/zh/life/", ja: "/ja/life/" },
  now: { en: "/now/", zh: "/zh/now/", ja: "/ja/now/" }
};

export const navLabels: Record<Lang, Record<PageKey, string>> = {
  en: {
    home: "Home",
    about: "About",
    cv: "CV",
    research: "Research",
    papers: "Papers",
    blog: "Blog",
    life: "Life",
    now: "Now"
  },
  zh: {
    home: "首页",
    about: "关于",
    cv: "简历",
    research: "研究",
    papers: "论文",
    blog: "札记",
    life: "生活",
    now: "近况"
  },
  ja: {
    home: "ホーム",
    about: "紹介",
    cv: "CV",
    research: "研究",
    papers: "論文",
    blog: "ノート",
    life: "生活",
    now: "近況"
  }
};

export const layoutText: Record<Lang, { meta: string; skip: string; navLabel: string; languageLabel: string; footer: string }> = {
  en: {
    meta: "Philosophy, AI ethics, trust",
    skip: "Skip to content",
    navLabel: "Primary navigation",
    languageLabel: "Language",
    footer: "Public notes and academic materials by Yan Zeng. Drafts require human review before publication."
  },
  zh: {
    meta: "哲学、AI 伦理、信任",
    skip: "跳到正文",
    navLabel: "主导航",
    languageLabel: "语言",
    footer: "Yan Zeng 的公开札记与学术材料。草稿必须经过人工审核后才会发布。"
  },
  ja: {
    meta: "哲学、AI倫理、信頼",
    skip: "本文へ移動",
    navLabel: "メインナビゲーション",
    languageLabel: "言語",
    footer: "Yan Zeng の公開ノートと学術資料。下書きは人間の確認を経てから公開されます。"
  }
};

export const navOrder: PageKey[] = ["home", "about", "cv", "research", "papers", "blog", "life", "now"];

export function absolutePath(path: string) {
  return `${siteBase}${path.replace(/^\/+/, "")}`;
}

export function hrefForPage(page: PageKey, lang: Lang) {
  return absolutePath(pagePaths[page][lang]);
}
