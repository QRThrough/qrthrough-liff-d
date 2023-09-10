import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "./component/TableComponent";
import { useMutation, useQuery } from "react-query";
import {
	allLogsService,
	deleteMemberService,
} from "../../../service/dashboard";
import { IResLogResponse, TFilter, TLog } from "../../../types";
import { Box, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import liff from "@line/liff";
import { useUserDataContext } from "../../../context/userData";
import { notifications } from "@mantine/notifications";
import SearchBar from "./component/SearchBar";
import { modals } from "@mantine/modals";

function LogPage() {
	const { setUserData } = useUserDataContext();
	const [logsData, setLogsData] = useState<IResLogResponse>({
		logs: [],
		count: 0,
	});
	const currentDate = new Date(); // Get the current date
	currentDate.setDate(currentDate.getDate() - 30);

	const [filter, setFilter] = useState<TFilter>({
		value: "",
		type: "STUDENT CODE",
		flag: [],
		status: [],
		start: currentDate,
		end: new Date(),
	});
	const { data, error, refetch } = useQuery(
		["all-logs-service", filter],
		() => {
			return allLogsService(filter);
		},
		{
			cacheTime: 5000,
			staleTime: 10000,
			onError: () => {
				if (!liff.isLoggedIn) setUserData(null);
			},
		}
	);

	useMemo(() => {
		if (error) console.error(`Error fetching all-users-service: ${error}`);
		const result = data?.data.result ?? { logs: [], count: 0 };
		const logs = result.logs.filter((e) => {
			const date = new Date(dayjs(e.created_at).utc().toString());

			return date >= filter.start && date <= filter.end;
		});

		setLogsData({
			logs: logs,
			count: logs.length,
		});
	}, [data, error, filter]);

	useEffect(() => {
		setFilter((prev) => ({ ...prev, value: "" }));
	}, [filter.type]);

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

	const deleteModal = (id: number) =>
		modals.openConfirmModal({
			title: "ยืนยันการลบผู้ใช้งาน",
			labels: { confirm: "ยืนยัน", cancel: "ยกเลิก" },
			onConfirm: () => delMutate(id),
			//onConfirm: () => console.log(id),
		});

	const columns = useMemo<MRT_ColumnDef<TLog>[]>(
		//column definitions...
		() => [
			{
				accessorKey: "account.student_code",
				header: "ชื่อ / รหัสนักศึกษา",
				Cell: ({ cell, row }) => (
					<Box>
						<Text size={14} weight="600" color="#464E5F">
							{row.original.account.firstname +
								" " +
								row.original.account.lastname}
						</Text>
						<Text size={14} weight="500" color="#464E5F">
							<>{cell.getValue() ?? ""}</>
						</Text>
					</Box>
				),
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
					deleteAction={deleteModal}
				/>
			</Flex>
		</>
	);
}

export default LogPage;
