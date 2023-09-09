import { Flex, createStyles } from "@mantine/core";

function AppLayout({ children }: { children?: JSX.Element }) {
	const { classes } = useStyles();
	return (
		<Flex
			pos="relative"
			m="0 auto"
			w="100vw"
			mih="100vh"
			justify="center"
			bg="#F9F7F8"
			className={classes.appLayout}
		>
			{children}
		</Flex>
	);
}

const useStyles = createStyles(() => ({
	appLayout: {
		[`@media (max-width: 1440px)`]: {
			width: "auto",
			justifyContent: "flex-start",
		},
	},
}));

export default AppLayout;
