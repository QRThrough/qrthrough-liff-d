import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "./component/TableComponent";
import { useMutation, useQuery } from "react-query";
import {
	allMembersService,
	deleteMemberService,
	updateMemberService,
} from "../../../service/dashboard";
import { IResUserResponse, Role, TFilter, TUser } from "../../../types";
import { Center, Flex, Group, Modal, Switch, px } from "@mantine/core";
import { IconUserCheck, IconUserEdit, IconUserX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import liff from "@line/liff";
import { useUserDataContext } from "../../../context/userData";
import { notifications } from "@mantine/notifications";
import SearchBar from "./component/SearchBar";
import EditForm from "./component/EditForm";
import { modals } from "@mantine/modals";

function UserPage() {
	const [opened, { open, close }] = useDisclosure(false);
	const { setUserData } = useUserDataContext();
	const [membersData, setMembersData] = useState<IResUserResponse>({
		users: [],
		count: 0,
	});

	const [filter, setFilter] = useState<TFilter>({
		value: "",
		type: "STUDENT CODE",
		flag: ["FOUND", "NOTFOUND", "EDIT"],
		status: ["Active", "Inactive"],
		start: new Date(),
		end: new Date(),
		order: "STUDENT CODE",
		sort: "ASC",
	});
	const { refetch } = useQuery(
		["all-members-service", filter],
		() => {
			return allMembersService(filter);
		},
		{
			cacheTime: 5000,
			staleTime: 10000,
			onError: () => {
				if (!liff.isLoggedIn) setUserData(null);
			},
			onSuccess(data) {
				const result = data.data.result ?? { users: [], count: 0 };
				const members = result.users
					.filter((e) => filter.flag.includes(e.flag))
					.filter((e) =>
						filter.status.includes(e.is_active ? "Active" : "Inactive")
					)
					.filter((e) => {
						const date = new Date(dayjs(e.created_at).utc().toString());

						return date >= filter.start && date <= filter.end;
					});

				setMembersData({
					users: members,
					count: members.length,
				});
			},
		}
	);
	const [seletedMember, setSeletedMember] = useState<TUser | null>(null);

	useEffect(() => {
		const currentDate = new Date();
		currentDate.setHours(23, 59);

		const prevDate = new Date(); // Get the current date
		prevDate.setMonth(currentDate.getMonth() - 1);
		prevDate.setHours(23, 59);
		setFilter((prev) => ({
			...prev,
			value: "",
			start: prevDate,
			end: currentDate,
		}));
	}, [filter.type]);

	const { mutateAsync } = useMutation(updateMemberService, {
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

	const { mutateAsync: delMutate } = useMutation(deleteMemberService, {
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
				accessorKey: "account_id",
				header: "รหัสนักศึกษา",
			},
			{
				accessorKey: "firstname",
				header: "ชื่อ - นามสกุล",
				Cell: ({ row }) => row.original.firstname + " " + row.original.lastname,
			},
			{
				accessorKey: "tel",
				header: "เบอร์โทร",
			},
			{
				accessorKey: "flag",
				header: "ชนิดการสมัคร",
				Cell: ({ cell }) => (
					<>
						{(() => {
							switch (cell.getValue()) {
								case "NOTFOUND":
									return (
										<Group>
											<IconUserX />
											ไม่มีในฐานข้อมูล
										</Group>
									);
								case "FOUND":
									return (
										<Group>
											<IconUserCheck />
											พบในฐานข้อมูล
										</Group>
									);
								case "EDIT":
									return (
										<Group>
											<IconUserEdit />
											เปลี่ยนข้อมูล
										</Group>
									);
								default:
									return <></>;
							}
						})()}
					</>
				),
			},
			{
				accessorKey: "created_at",
				header: "วันที่สมัคร",
				Cell: ({ row }) => (
					<>
						{dayjs(row.original.created_at).utc().format("DD/MM/YYYY HH:mm A")}
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
					moderatorPage={false}
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

export default UserPage;
