import packageJSON from "./package.json";

const isDev = process.env.NUXT_PUBLIC_APP_ENV === "dev";

const name = "БІО Домашній врожай";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,

	modules: [
		"@nuxtjs/robots",
		"@nuxtjs/tailwindcss",
		"nuxt-svgo",
		"@nuxtjs/leaflet",
		"@pinia/nuxt",
		"@nuxt/image",
		"nuxt-swiper",
		"@nuxtjs/sitemap",
	],

	runtimeConfig: {
		public: {
			APP_VERSION: packageJSON.version,
			APP_ENV:
				process.env.NUXT_PUBLIC_APP_ENV ||
				("production" as "production" | "staging" | "dev"),
			STORE_NAME: name,
			STORE_LOCATION: {
				village: "Квітневе",
				town: "Бровари",
				region: "Київська область",
			},
			CONTACT: {
				phone: "+380XXXXXXXXX",
				telegram: "@kvitnevi_vrogy",
				facebook: "https://facebook.com/kvitnevi.vrogy",
				whatsapp: "+380XXXXXXXXX",
			},
			APP_URL: process.env.NUXT_PUBLIC_APP_URL || "http://localhost:3000",
		},
	},

	nitro: {
		// preset: "node-server",
		// devProxy: {
		// 	host: "localhost",
		// },
		prerender: {
			routes: ["/prerender-images"],
		},
		esbuild: {
			options: {
				target: "esnext",
			},
		},
	},

	build: {
		transpile: ["trpc-nuxt"],
	},

	compatibilityDate: "2025-07-05",
	devtools: { enabled: false },
	css: ["~/assets/css/main.css"],

	pinia: {
		storesDirs: ["./app/stores/**"],
	},

	svgo: {
		defaultImport: "component",
	},

	vite: {
		server: {
			cors: {
				preflightContinue: true,
			},
		},
		resolve: {
			alias: {
				".prisma/client/index-browser":
					"prismaclient/generated/index-browser.js",
			},
		},
		optimizeDeps: {
			exclude: ["better-sqlite3"],
		},
	},

	sourcemap: {
		server: isDev,
		client: isDev,
	},

	image: {
		quality: 80,
		format: ["avif", "webp", "png"],
	},

	site: {
		indexable: true,
		url: process.env.NUXT_PUBLIC_APP_URL,
		name,
	},
	sitemap: {
		sources: [`${process.env.NUXT_PUBLIC_APP_URL}/sitemap.xml`],
	},
});
