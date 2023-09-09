import { MantineThemeOverride, rem } from "@mantine/core";

const theme: MantineThemeOverride = {
	colorScheme: "light",
	colors: {
		"brand-primary": ["#cd3a29"],
		"brand-secondary": ["#e2590b"],
		"brand-complementary": ["#16438c"],
		"brand-gray": ["#C4C4C4"],
		"brand-error": ["#FA5252"],
	},
	black: "#232323",
	white: "white",
	fontFamily: "Poppins, Mitr",
	focusRingStyles: {
		inputStyles: (theme) => ({
			outline: `${rem(2)} solid ${theme.colors["brand-secondary"]}`,
		}),
	},
	headings: {
		fontFamily: "Poppins",
		fontWeight: 600,
		sizes: {
			h1: { fontSize: rem(48) },
			h2: { fontSize: rem(36) },
			h3: { fontSize: rem(32) },
			h4: { fontSize: rem(24) },
			h5: { fontSize: rem(18) },
		},
	},
};
export default theme;
