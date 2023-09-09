import { Global } from "@emotion/react";

export function CustomFonts() {
	return (
		<Global
			styles={[
				{
					"@font-face": {
						fontFamily: "Mitr",
						fontStyle: "normal",
						fontWeight: "normal",
						src: `url('/fonts/Mitr/Mitr-Light.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Mitr",
						fontStyle: "normal",
						fontWeight: "bold",
						src: `url('/fonts/Mitr/Mitr-Bold.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Mitr",
						fontStyle: "normal",
						fontWeight: "300",
						src: `url('/fonts/Mitr/Mitr-ExtraLight.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Mitr",
						fontStyle: "normal",
						fontWeight: "500",
						src: `url('/fonts/Mitr/Mitr-Medium.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Mitr",
						fontStyle: "normal",
						fontWeight: "600",
						src: `url('/fonts/Mitr/Mitr-SemiBold.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Poppins",
						fontStyle: "normal",
						fontWeight: "normal",
						src: `url('/fonts/Poppins/Poppins-Regular.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Poppins",
						fontStyle: "normal",
						fontWeight: "bold",
						src: `url('/fonts/Poppins/Poppins-Bold.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Poppins",
						fontStyle: "normal",
						fontWeight: "300",
						src: `url('/fonts/Poppins/Poppins-Light.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Poppins",
						fontStyle: "normal",
						fontWeight: "500",
						src: `url('/fonts/Poppins/Poppins-Medium.ttf') format("truetype")`,
					},
				},
				{
					"@font-face": {
						fontFamily: "Poppins",
						fontStyle: "normal",
						fontWeight: "600",
						src: `url('/fonts/Poppins/Poppins-SemiBold.ttf') format("truetype")`,
					},
				},
			]}
		/>
	);
}
