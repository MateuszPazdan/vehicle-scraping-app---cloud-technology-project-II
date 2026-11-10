import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				comfortaa: [''],
			},
			colors: {
				main: '#52b788',
				mainHover: '#40916c',
				gray: '#333',
			},
			screens: {
				sm300: '300px',
				sm400: '400px',
				sm500: '500px',
			},
		},
	},
	plugins: [],
};
export default config;
