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

			md: { max: "870px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
		extend: {
			fontFamily: {
				// Poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				primary: "#e84142",
				ivory: "#FBF1E1",
				bunting: "#101741",
				divider: "#CEC7BA",
				yellow: "#F4B52D",
				"dark-yellow": "#AA7E1F",
				gray: "#DCD4C6",
				"light-gray": "#A9A9BC",
				"light-mask": "rgba(195, 195, 195, 0.14)",
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
			boxShadow: {
				"2xl": "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;",
				"3xl": "rgb(0 0 0 / 59%) 6px 6px 20px 6px",
			},
		},
	},
	plugins: [],
};
