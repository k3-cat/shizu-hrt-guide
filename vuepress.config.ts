import { defineUserConfig } from "vuepress";
import { getDirname } from "vuepress/utils";
import { viteBundler } from "@vuepress/bundler-vite";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { defaultTheme } from "@vuepress/theme-default";
import { path } from "@vuepress/utils";

import markdownItAttrs from "markdown-it-attrs";
import markdownItBracketedSpans from "markdown-it-bracketed-spans";
import markdownItInsert from "markdown-it-ins";
import markdownItImsize from "markdown-it-imsize";
import markdownItMultimdTable from "markdown-it-multimd-table";

const __dirname = getDirname(import.meta.url);

const config = defineUserConfig({
  lang: "zh-CN",
  title: "Shizu's HRT Guide",
  description: "Shizu's HRT Guide for transfemale",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "stylesheet", href: "/custom.css", type: "text/css" }],
  ],
  theme: defaultTheme({
    hostname: "http://shizu.3c6.org/",
    logo: "/logo.png",
    repo: "BBleae/hrt-book",
    repoLabel: "GitHub",
    docsRepo: "BBleae/hrt-book",
    docsDir: "docs",
    docsBranch: "main",
    editLink: true,
    contributors: true,
    lastUpdated: true,
    externalLinkIcon: true,
    sidebar: {
      "/parts/": [
        "/parts/Part0.md",
        "/parts/Part1.md",
        "/parts/Part2.md",
        "/parts/Part3.md",
        "/parts/Part4.md",
        "/parts/Part5.md",
        "/parts/Part6.md",
        "/parts/Part7.md",
      ],
      "/cafe/": [
        "/cafe/HOME.md",
        "/cafe/DONATE.md",
        "/cafe/Estradiol.md",
        "/cafe/Progesterone.md",
        "/cafe/Anti-Androgens.md",
        "/cafe/HairLoss.md",
        "/cafe/SERMs.md",
        "/cafe/Miscellaneous.md",
        "/cafe/RESOURCES.md",
        "/cafe/CONTACT.md",
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      { text: "正文", link: "/parts/Part0.html" },
      { text: "Cafe", link: "/cafe/" },
      { text: "工具", link: "/tools/" },
      { text: "链接", link: "/link/" },
      { text: "Credits", link: "/credits/" },
    ],
    themePlugins: {
      hint: false,
      prismjs: false,
      tab: false,
    },
  }),
  bundler: viteBundler(),
  shouldPrefetch: false,
  extendsMarkdown: (md) => {
    md.use(markdownItBracketedSpans);
    md.use(markdownItAttrs);
    md.use(markdownItInsert);
    md.use(markdownItImsize);
    md.use(markdownItMultimdTable, {
      rowspan: true,
    });
  },
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.join(__dirname, "./components"),
    }),
  ],
});

export default config;
