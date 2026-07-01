import path from "node:path";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { clarityAnalyticsPlugin } from "@vuepress/plugin-clarity-analytics";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { slimsearchPlugin } from "@vuepress/plugin-slimsearch";
import { defaultTheme } from "@vuepress/theme-default";
import { removeHtmlExtensionPlugin } from "vuepress-plugin-remove-html-extension";

import { attrs } from "@mdit/plugin-attrs";
import { figure } from "@mdit/plugin-figure";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { imgSize } from "@mdit/plugin-img-size";
import bracketedSpans from "markdown-it-bracketed-spans";
import multimdTable from "markdown-it-multimd-table";

const config = defineUserConfig({
	lang: "zh-CN",
	title: "Shizu's HRT Guide",
	description: "Shizu's HRT Guide for transfemale",
	head: [
		["link", { rel: "icon", href: "/favicon.ico" }],
		["link", { rel: "manifest", href: "/manifest.webmanifest" }],
		[
			"meta",
			{
				"http-equiv": "Content-Security-Policy",
				content:
					"default-src 'self'; " +
					"base-uri 'self'; " +
					"style-src 'self' 'unsafe-inline'; " +
					"img-src 'self' data: https://c.clarity.ms https://c.bing.com https://contrib.rocks https://challenges.cloudflare.com; " +
					"frame-src 'self' *.clarity.ms https://challenges.cloudflare.com; " +
					"script-src-elem 'self' 'unsafe-inline' *.clarity.ms https://challenges.cloudflare.com https://static.cloudflareinsights.com; " +
					"connect-src 'self' *.clarity.ms cloudflareinsights.com;",
			},
		],
	],
	theme: defaultTheme({
		hostname: "https://shizu.3c6.org/",
		logo: "/logo.png",
		repo: "k3-cat/shizu-hrt-guide",
		repoLabel: "GitHub",
		docsRepo: "k3-cat/shizu-hrt-guide",
		docsDir: "docs",
		docsBranch: "main",
		editLink: true,
		contributors: true,
		lastUpdated: true,
		externalLinkIcon: true,
		prev: false,
		next: false,
		sidebar: {
			"/main/": [
				"/main/Part0.md",
				"/main/Part1.md",
				"/main/Part2.md",
				"/main/Part3.md",
				"/main/Part4.md",
				"/main/Part5.md",
				"/main/Part6.md",
				"/main/Part7.md",
			],
			"/cafe/": [
				"/cafe/HOME.md",
				"/cafe/Estradiol.md",
				"/cafe/Progesterone.md",
				"/cafe/Anti-Androgens.md",
				"/cafe/HairLoss.md",
				"/cafe/SERMs.md",
				"/cafe/Miscellaneous.md",
				"/cafe/RESOURCES.md",
				"/cafe/DONATE.md",
				"/cafe/CONTACT.md",
			],
		},
		navbar: [
			{ text: "首页", link: "/" },
			{ text: "正文", link: "main/Part0.md" },
			{ text: "Cafe", link: "/cafe/" },
			{ text: "工具", link: "/tools/" },
			{ text: "Credits", link: "CREDITS.md" },
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
		md.use(bracketedSpans);
		md.use(attrs, {
			rule: ["fence", "inline", "list", "heading", "hr", "softbreak", "block"],
		});
		md.use(multimdTable, { rowspan: true });
		md.use(imgSize);
		md.use(figure);
		md.use(imgLazyload);
	},
	plugins: [
		removeHtmlExtensionPlugin(),
		slimsearchPlugin({
			indexContent: true,
			indexOptions: {
				tokenize(text, _fieldName) {
					const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
					return Array.from(segmenter.segment(text)).map((s) => s.segment);
				},
			},
		}),
		clarityAnalyticsPlugin({ id: process.env.VITE_CLARITY_ID! }),
		registerComponentsPlugin({
			componentsDir: path.join(__dirname, "./.vuepress/components/"),
		}),
	],
});

export default config;
