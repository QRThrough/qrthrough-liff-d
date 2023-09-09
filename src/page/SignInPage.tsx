import liff from "@line/liff";
import {
	Group,
	createStyles,
	Card,
	Flex,
	BackgroundImage,
	Box,
	Text,
	Image,
} from "@mantine/core";
import { useQuery } from "react-query";
import { signInService } from "../service/auth";
import { useUserDataContext } from "../context/userData";

function SignInPage() {
	const { classes } = useStyles();
	const { userData, setUserData } = useUserDataContext();

	// eslint-disable-next-line no-empty-pattern
	const {} = useQuery("init", liffService, {
		staleTime: Infinity,
	});

	async function liffService() {
		setUserData({
			role: "ADMIN",
		});
		// await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
		// if (liff.isLoggedIn()) {
		// 	if (userData && userData.role === "USER") {
		// 		liff.logout();
		// 		setUserData(null);
		// 	} else {
		// 		try {
		// 			const data = (await signInService()).data;
		// 			setUserData((prev) => ({
		// 				...prev,
		// 				role: data.result.role,
		// 			}));
		// 		} catch (err) {
		// 			console.log(err);
		// 			liff.logout();
		// 			setUserData(null);
		// 		}
		// 	}
		// }
	}

	const handlerSignIn = () => {
		liff.login();
	};

	return (
		<div className={classes.container}>
			<Card className={classes.card} shadow="md" withBorder>
				<Flex w="100%" h="100%">
					<BackgroundImage
						className={classes.sideImg}
						src="https://img.freepik.com/free-photo/vertical-shot-river-surrounded-by-mountains-meadows-scotland_181624-27881.jpg?w=1060&t=st=1687287285~exp=1687287885~hmac=def88ea7ae350ebf096c97f177d74fd0f9dd3a5fd30c91351fcf05a45564e923"
					/>
					<Group
						maw="500px"
						h="100%"
						w="100%"
						mx="auto"
						px="4rem"
						sx={{ alignContent: "space-between" }}
						py="100px"
					>
						<Flex direction="column" align="center" w="100%">
							<Image src="/qr-through-logo.svg" width="150px" height="150px" />
							<Text size="18px" weight="500" align="center" w="100%">
								ADMIN DASHBOARD
							</Text>
						</Flex>

						<Box w="100%" mt="40px" onClick={handlerSignIn}>
							<Flex
								className={classes.lineBtn}
								gap="lg"
								align="center"
								justify="center"
							>
								<Image
									src="line/btn_base.png"
									width="2.5rem"
									height="2.5rem"
									style={{ alignSelf: "flex-start" }}
								/>
								<Text size="18px" weight="600">
									Log in with LINE
								</Text>
							</Flex>
						</Box>
						<Text size="18px" weight="500" align="center" w="100%" mt="40px">
							WE ARE ALL <br /> ENTANEER CMU
						</Text>
					</Group>
				</Flex>
			</Card>
		</div>
	);
}

const useStyles = createStyles((theme) => ({
	container: {
		width: "100%",
		height: "100%",
		maxHeight: "80vh",

		padding: "0 100px",

		[`@media (max-width: 992px)`]: {
			padding: "0 50px",
		},

		[`@media (max-width: 768px)`]: {
			padding: "0 2rem",
		},
	},
	lineBtn: {
		borderRadius: ".4rem",
		padding: "1rem",
		color: "#FFFFFF",
		backgroundColor: "#06C755",
		cursor: "pointer",
	},
	card: {
		width: "100%",
		height: "100%",
		padding: "0 !important",

		background: "#FFF",
		borderRadius: theme.spacing.xl,
		overflow: "hidden",
	},
	sideImg: {
		[`@media (max-width: 768px)`]: {
			maxWidth: "250px",
		},

		[`@media (max-width: 600px)`]: {
			display: "none",
		},
	},
}));

export default SignInPage;
