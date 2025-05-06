module.exports = {
	darkMode: 'media',
	content: ['src/**/*.{js,ts,jsx,tsx}', 'public/**/*.html'],
	corePlugins: {
		float: false,
		clear: false,
		skew: false
	},
	theme: {
		extend: {
			screens: {
				'min-xs': '375px',
				'min-xsm': '425px',
				'min-sm': '640px',
				'min-md': '768px',
				'min-lg': '1024px',
				'min-xl': '1280px',
				'min-xxl': '1440px',
				'min-xxl2': '1540px',
				'min-xxxl': '1920px',
				'max-sm': { max: '424px' },
				'max-md': { max: '767px' },
				'max-lg': { max: '1023px' }
			}
		}
	}
}
