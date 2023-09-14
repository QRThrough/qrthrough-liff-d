import { Flex, Box, Text, Card, Switch, Group, Modal } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { TController } from "../../types";
import liff from "@line/liff";
import { useMutation, useQuery } from "react-query";
import {
	getDashboardService,
	updateDashboardService,
} from "../../service/dashboard";
import { useUserDataContext } from "../../context/userData";
import { notifications } from "@mantine/notifications";
import EditTime from "../EditTime";

function DashboardPage() {
	const [opened, { open, close }] = useDisclosure(false);
	const { setUserData } = useUserDataContext();
	const [controller, setController] = useState<TController | undefined>(
		undefined
	);

	const { status, refetch } = useQuery(
		"get-dashboard-service",
		() => {
			return getDashboardService();
		},
		{
			onError: () => {
				if (!liff.isLoggedIn) setUserData(null);
			},
			onSuccess(data) {
				setController(data.data.result);
			},
		}
	);

	const { mutateAsync } = useMutation(updateDashboardService, {
		onMutate() {
			notifications.show({
				color: "blue",
				message: "กำลังอัพเดตข้อมูล",
			});
		},
		onSuccess() {
			notifications.show({
				color: "green",
				message: "อัพเดตข้อมูลสำเร็จ",
			});
			refetch();
		},
		onError() {
			notifications.show({
				color: "red",
				message: "อัพเดตข้อมูลล้มเหลว",
			});
		},
		onSettled() {
			close();
		},
	});

	const statusModal = (power: boolean) =>
		modals.openConfirmModal({
			title: "ยืนยันการปรับเปลี่ยนสถานะระบบ",
			labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
			onConfirm: () => {
				if (!controller) return;
				mutateAsync({
					openTime: controller.openTime,
					closeTime: controller.closeTime,
					power: power,
				});
			},
		});

	const handleChangeTime = (value: { openTime: string; closeTime: string }) => {
		if (!controller) return;
		mutateAsync({ power: controller.power, ...value });
	};

	return (
		<>
			{status === "success" && controller != undefined ? (
				<>
					<Modal
						opened={opened}
						onClose={() => {
							close();
						}}
						title={"ปรับเปลี่ยนเวลาเปิด"}
					>
						<EditTime
							data={controller}
							handleChangeTime={handleChangeTime}
							close={close}
						/>
					</Modal>
					<Flex direction="column" gap="2rem">
						<Box sx={{ flex: 0.5 }} miw="150px">
							<Text size="20px" weight="600">
								แดชบอร์ด
							</Text>
						</Box>
						<Card h="100%" shadow="md" padding="xl">
							<Text weight={500} size="lg">
								แผงควบคุม
							</Text>
							<Box mt="md">
								<Text weight="500">เปิด - ปิด ระบบ : </Text>
								<Switch
									onLabel="ON"
									offLabel="OFF"
									size="xl"
									mt="sm"
									checked={controller.power}
									onChange={(e) => {
										statusModal(e.target.checked);
									}}
								/>
							</Box>

							<Flex direction="column" mt="sm">
								<Text weight="500">ช่วงเวลาเปิด :</Text>
								<Group mt="sm">
									<TimeInput
										readOnly
										w="min-content"
										value={controller.openTime}
										withAsterisk
									/>{" "}
									<Text weight={400} size="md">
										ถึง
									</Text>
									<TimeInput
										readOnly
										w="min-content"
										value={controller.closeTime}
										withAsterisk
									/>
									<IconEdit onClick={open} />
								</Group>
							</Flex>
						</Card>
					</Flex>
				</>
			) : (
				<Text size="14px" color="#59151E">
					Loading dashboard controller data.
				</Text>
			)}
		</>
	);
}

export default DashboardPage;
