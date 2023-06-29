
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	corePlugins: {
    preflight: false,
  },
	theme: {
		extend: {
			colors: require('./_colors.cjs'),
			fontFamily: require('./_fonts.cjs'),
			typography: require('./_typography.cjs'),
			screens: {
        'desktop-nav': '960px',
      },
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
