/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('@tailwindcss/forms')],
};
