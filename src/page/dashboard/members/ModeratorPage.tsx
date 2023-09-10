import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "./component/TableComponent";
import { useMutation, useQuery } from "react-query";
import {
	allModeratorsService,
	deleteModeratorService,
	updateModeratorService,
} from "../../../service/dashboard";
import { IResUserResponse, Role, TFilter, TUser } from "../../../types";
import { Box, Center, Flex, Modal, Switch, Text, px } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import liff from "@line/liff";
import { useUserDataContext } from "../../../context/userData";
import { notifications } from "@mantine/notifications";
import SearchBar from "./component/SearchBar";
import EditForm from "./component/EditForm";
import { modals } from "@mantine/modals";

function ModeratorPage() {
	const [opened, { open, close }] = useDisclosure(false);
	const { setUserData } = useUserDataContext();
	const [membersData, setMembersData] = useState<IResUserResponse>({
		users: [],
		count: 0,
	});
	const currentDate = new Date(); // Get the current date
	currentDate.setDate(currentDate.getDate() - 30);

	const [filter, setFilter] = useState<TFilter>({
		value: "",
		type: "STUDENT CODE",
		flag: ["FOUND", "NOTFOUND", "EDIT"],
		status: ["Active", "Inactive"],
		start: currentDate,
		end: new Date(),
	});
	const { data, error, refetch } = useQuery(
		["all-members-service", filter],
		() => {
			return allModeratorsService(filter);
		},
		{
			cacheTime: 5000,
			staleTime: 10000,
			onError: () => {
				if (!liff.isLoggedIn) setUserData(null);
			},
		}
	);
	const [seletedMember, setSeletedMember] = useState<TUser | null>(null);

	useMemo(() => {
		if (error) console.error(`Error fetching all-moderators-service: ${error}`);
		const result = data?.data.result ?? { users: [], count: 0 };
		const members = result.users;

		setMembersData({
			users: members,
			count: members.length,
		});
	}, [data, error]);

	useEffect(() => {
		setFilter((prev) => ({ ...prev, value: "" }));
	}, [filter.type]);

	const { mutateAsync } = useMutation(updateModeratorService, {
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
			setSeletedMember(null);
			close();
		},
	});

	const { mutateAsync: delMutate } = useMutation(deleteModeratorService, {
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
	});

	const handleSubmitEdit = (values: {
		firstname: string;
		lastname: string;
		tel: string;
		role: Role;
	}) => {
		if (!seletedMember) {
			setSeletedMember(null);
			return;
		}
		mutateAsync({ ...seletedMember, ...values });
	};

	const changeStatusModal = (data: TUser) =>
		modals.openConfirmModal({
			title: "ยืนยันการปรับเปลี่ยนสถานะการใช้งาน",
			labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
			onConfirm: () =>
				mutateAsync({ ...data, is_active: data.is_active ? false : true }),
		});

	const editModal = (data: TUser) => {
		setSeletedMember(data);
		open();
	};

	const deleteModal = (id: number) =>
		modals.openConfirmModal({
			title: "ยืนยันการลบผู้ใช้งาน",
			labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
			onConfirm: () => delMutate(id),
			//onConfirm: () => console.log(id),
		});

	const columns = useMemo<MRT_ColumnDef<TUser>[]>(
		//column definitions...
		() => [
			{
				accessorKey: "student_code",
				header: "ชื่อ / รหัสนักศึกษา",
				Cell: ({ cell, row }) => (
					<Box>
						<Text size={14} weight="600" color="#464E5F">
							{row.original.firstname + " " + row.original.lastname}
						</Text>
						<Text size={14} weight="500" color="#464E5F">
							<>{cell.getValue() ?? ""}</>
						</Text>
					</Box>
				),
			},
			{
				accessorKey: "tel",
				header: "เบอร์โทร",
			},
			{
				accessorKey: "role",
				header: "ตำแหน่ง",
				Cell: ({ cell }) => (
					<>
						{(() => {
							switch (cell.getValue()) {
								case "ADMIN":
									return <Text>แอดมิน</Text>;
								case "MODERATOR":
									return <Text>ผู้ควบคุม</Text>;
								case "USER":
									return <Text>ผู้ใช้</Text>;
								default:
									return <></>;
							}
						})()}
					</>
				),
			},
			{
				accessorKey: "is_active",
				header: "สถานะ",
				Cell: ({ row }) => (
					<Center>
						<Switch
							checked={row.original.is_active}
							onChange={() => changeStatusModal(row.original)}
						/>
					</Center>
				),
				size: px("1rem"),
			},
		],
		[]
		//end
	);
	return (
		<>
			<Modal
				opened={opened}
				onClose={() => {
					setSeletedMember(null);
					close();
				}}
				title={seletedMember ? "แก้ไขข้อมูลผู้ใช้งาน" : "นำออกผู้ใช้งาน"}
			>
				<EditForm
					data={seletedMember}
					handleSubmitEdit={handleSubmitEdit}
					setSeleted={setSeletedMember}
					close={close}
				/>
			</Modal>
			<Flex direction="column" h="100%">
				<SearchBar
					moderatorPage
					membersData={membersData}
					filter={filter}
					setFilter={setFilter}
				/>
				<TableComponent
					columns={columns}
					data={membersData.users}
					editAction={editModal}
					deleteAction={deleteModal}
				/>
			</Flex>
		</>
	);
}

export default ModeratorPage;
