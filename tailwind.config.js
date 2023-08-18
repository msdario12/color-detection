/** @type {import('tailwindcss').Config} */
export default {
	important: true, // Add this in config file
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
