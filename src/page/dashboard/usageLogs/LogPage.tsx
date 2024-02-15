import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "./component/TableComponent";
import { useQuery } from "react-query";
import { allLogsService } from "../../../service/dashboard";
import { IResLogResponse, TFilter, TLog } from "../../../types";
import { Flex, Group } from "@mantine/core";
import dayjs from "dayjs";
import liff from "@line/liff";
import { useUserDataContext } from "../../../context/userData";
import SearchBar from "./component/SearchBar";
import { IconUser, IconUserCog, IconUserStar } from "@tabler/icons-react";

function LogPage() {
	const { setUserData } = useUserDataContext();
	const [logsData, setLogsData] = useState<IResLogResponse>({
		logs: [],
		count: 0,
	});

	const [filter, setFilter] = useState<TFilter>({
		value: "",
		type: "STUDENT CODE",
		flag: [],
		status: [],
		start: new Date(),
		end: new Date(),
		order: "DATE",
		sort: "DESC",
	});
	const { refetch } = useQuery(
		["all-logs-service", filter],
		() => {
			return allLogsService(filter);
		},
		{
			cacheTime: 5000,
			staleTime: 10000,
			onSuccess(data) {
				const result = data.data.result ?? { logs: [], count: 0 };
				const logs = result.logs.filter((e) => {
					const date = new Date(dayjs(e.created_at).utc().toString());

					return date >= filter.start && date <= filter.end;
				});
				setLogsData({
					logs: logs,
					count: logs.length,
				});
			},
			onError: () => {
				if (!liff.isLoggedIn) setUserData(null);
			},
		}
	);

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

	// const { mutateAsync: delMutate } = useMutation(deleteLogService, {
	// 	onMutate() {
	// 		notifications.show({
	// 			color: "blue",
	// 			message: "กำลังอัพเดตข้อมูล",
	// 		});
	// 	},
	// 	onSuccess() {
	// 		notifications.show({
	// 			color: "green",
	// 			message: "อัพเดตข้อมูลสำเร็จ",
	// 		});
	// 		refetch();
	// 	},
	// 	onError() {
	// 		notifications.show({
	// 			color: "red",
	// 			message: "อัพเดตข้อมูลล้มเหลว",
	// 		});
	// 	},
	// });

	// const deleteModal = (id: number) =>
	// 	modals.openConfirmModal({
	// 		title: "ยืนยันการลบผู้ใช้งาน",
	// 		labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
	// 		onConfirm: () => delMutate(id),
	// 		//onConfirm: () => console.log(id),
	// 	});

	const columns = useMemo<MRT_ColumnDef<TLog>[]>(
		//column definitions...
		() => [
			{
				accessorKey: "account.account_id",
				header: "รหัสนักศึกษา",
			},
			{
				accessorKey: "account.firstname",
				header: "ชื่อ - นามสกุล",
				Cell: ({ row }) =>
					row.original.account.firstname + " " + row.original.account.lastname,
			},
			{
				accessorKey: "account.tel",
				header: "เบอร์โทร",
			},
			{
				accessorKey: "account.role",
				header: "ตำแหน่ง",
				Cell: ({ cell }) => (
					<>
						{(() => {
							switch (cell.getValue()) {
								case "ADMIN":
									return (
										<Group>
											<IconUserStar />
											แอดมิน
										</Group>
									);
								case "MODERATOR":
									return (
										<Group>
											<IconUserCog />
											ผู้ควบคุม
										</Group>
									);
								case "USER":
									return (
										<Group>
											<IconUser />
											ผู้ใช้
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
				header: "วันที่ใช้งาน",
				Cell: ({ row }) => (
					<>
						{dayjs(row.original.created_at).utc().format("DD/MM/YYYY HH:mm A")}
					</>
				),
			},
		],
		[]
		//end
	);
	return (
		<>
			<Flex direction="column" h="100%">
				<SearchBar logsData={logsData} filter={filter} setFilter={setFilter} />
				<TableComponent
					columns={columns}
					data={logsData.logs}
					// deleteAction={deleteModal}
				/>
			</Flex>
		</>
	);
}

export default LogPage;
