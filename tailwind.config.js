/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'index.html',
		'./src/**/*.{html,js,jsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
