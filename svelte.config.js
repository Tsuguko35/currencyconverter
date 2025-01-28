import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html' // Specify a custom fallback file
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/currencyconverter' : ''
		}
	}
};

export default config;
