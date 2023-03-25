/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{tsx,tsx, js, jsx}', './index.html'],
	theme: {
		mode: 'jit',
		purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
		extend: {
			colors: {},
			backgroundImage: {
				galaxy: "url('/background.png')",
				'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
				'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
			},
		},
		screens: {
			lg: { max: '1024px' },
			md: { max: '768px' },
			sm: { max: '425px' },
			xs: { max: '350px' },
		},
	},
	plugins: [],
};
