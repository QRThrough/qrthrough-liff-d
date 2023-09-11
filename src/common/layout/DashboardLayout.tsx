import liff from "@line/liff";
import {
	Group,
	Navbar,
	createStyles,
	getStylesRef,
	rem,
	AppShell,
	Burger,
	Header,
	MediaQuery,
	Image,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
	IconLayoutDashboard,
	IconFileSpreadsheet,
	IconUserStar,
	IconLogout,
	IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useUserDataContext } from "../../context/userData";

const data = [
	{ link: "", label: "แดชบอร์ด", icon: IconLayoutDashboard },
	{ link: "/log", label: "รายการใช้งานระบบ", icon: IconFileSpreadsheet },
	{ link: "/user", label: "จัดการทะเบียนผู้ใช้งาน", icon: IconUser },
	{ link: "/moderator", label: "จัดการทะเบียนแอดมิน", icon: IconUserStar },
];

function DashboardLayout() {
	const { classes, theme, cx } = useStyles();
	const breakpointPixel = +theme.breakpoints.md.split("em")[0] * 16;
	const { width } = useViewportSize();

	const { userData, setUserData } = useUserDataContext();

	// business logic
	const [opened, setOpened] = useState(false);
	const location = useLocation();

	const links = data.map((item) => {
		return (
			<Link
				to={`/dashboard${item.link}`}
				key={item.label}
				className={cx(classes.link, {
					[classes.linkActive]: `/dashboard${item.link}` === location.pathname,
				})}
			>
				<item.icon className={classes.linkIcon} stroke={1.5} />
				<span>{item.label}</span>
			</Link>
		);
	});

	return (
		<AppShell
			bg="white"
			header={
				width < breakpointPixel ? (
					<Header height={{ base: 50 }} p="md">
						<MediaQuery
							largerThan="md"
							styles={{
								display: "none",
							}}
						>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								mr="xl"
							/>
						</MediaQuery>
					</Header>
				) : undefined
			}
			navbarOffsetBreakpoint="md"
			navbar={
				<Navbar
					hiddenBreakpoint="md"
					hidden={!opened}
					width={{ sm: "100vw", md: 300 }}
					p="md"
				>
					<Navbar.Section grow>
						<Group className={classes.header}>
							{/* <Title order={2}>QR THROUGH</Title> */}
							<Image src="/Brand_QRThrough.png" />
						</Group>
						{links.filter((e) =>
							e.key === "จัดการทะเบียนแอดมิน"
								? userData?.role === "ADMIN"
									? true
									: false
								: true
						)}
					</Navbar.Section>

					<Navbar.Section className={classes.footer}>
						<a
							href="#"
							className={classes.link}
							onClick={() => {
								liff.logout();
								setUserData(null);
							}}
						>
							<IconLogout className={classes.linkIcon} stroke={1.5} />
							<span>ออกจากระบบ</span>
						</a>
					</Navbar.Section>
				</Navbar>
			}
		>
			{/* <Flex w="100%" h="100%" px="50px">
				<Card
					w="100%"
					p="2rem"
					shadow="sm"
					sx={{
						borderRadius: theme.spacing.xs,
					}}
				>
					<Outlet />
				</Card>
			</Flex> */}
			<Outlet />
		</AppShell>
	);
}

const useStyles = createStyles((theme) => ({
	header: {
		paddingBottom: theme.spacing.md,
		marginBottom: `calc(${theme.spacing.md} * 1.5)`,
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
	},

	footer: {
		paddingTop: theme.spacing.md,
		marginTop: theme.spacing.md,
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
	},

	container: {
		width: "100%",
		height: "100vh",
		[`@media (max-width: 1440px)`]: {
			width: "auto",
			height: "auto",
			overflowX: "scroll",
			flexWrap: "nowrap",
		},
	},

	navbar: {
		width: "300px",
		minWidth: "300px",
		[`@media (max-width: 992px)`]: {
			minWidth: "none",
			width: "auto",
		},
	},

	link: {
		...theme.fn.focusStyles(),
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[7],
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,

			[`& .${getStylesRef("icon")}`]: {
				color: theme.colorScheme === "dark" ? theme.white : theme.black,
			},
		},
	},
	linkIcon: {
		ref: getStylesRef("icon"),
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[2]
				: theme.colors.gray[6],
		marginRight: theme.spacing.sm,
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
			[`& .${getStylesRef("icon")}`]: {
				color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
					.color,
			},
		},
	},
}));

export default DashboardLayout;
