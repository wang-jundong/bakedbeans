module.exports = {
	mode: "jit",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			"2xl": { max: "1535px" },
			// => @media (max-width: 1535px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "870" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
		extend: {
			fontFamily: {
				// Poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				// "neon-blue": "#4839EA",
			},
			width: {},
			height: {},
			aspectRatio: {
				"2/5": "2 / 5",
			},
			transitionProperty: {
				// height: "height",
			},
			backgroundImage: {
				// max_btn_background:
				// 	"url('/src/assets/svgs/max-btn-background.svg')",
			},
		},
	},
	plugins: [],
};
