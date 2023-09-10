import { Group, Box, Text, Input, Button, Flex, Select } from "@mantine/core";
import { IconFileExport, IconSearch } from "@tabler/icons-react";
import { IResLogResponse, TFilter, TFilterType } from "../../../../types";
import dayjs from "dayjs";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { DateTimePicker } from "@mantine/dates";

interface ISearchLog {
	logsData: IResLogResponse;
	filter: TFilter;
	setFilter: React.Dispatch<React.SetStateAction<TFilter>>;
}

function SearchBar({ logsData, filter, setFilter }: ISearchLog) {
	const exportData = logsData.logs.map((e) => {
		let role = "";
		switch (e.account.role) {
			case "ADMIN":
				role = "แอดมิน";
				break;
			case "MODERATOR":
				role = "ผู้ควบคุม";
				break;
			case "USER":
				role = "ผู้ใช้";
				break;
			default:
				break;
		}
		return {
			["รหัสนักศึกษา"]: e.account.student_code,
			["ชื่อ"]: e.account.firstname,
			["นามสกุล"]: e.account.lastname,
			["เบอร์"]: String(e.account.tel),
			["ตำแหน่ง"]: role,
			["วันที่ใช้งาน"]: dayjs(e.created_at)
				.utc()
				.format("DD/MM/YYYY HH:mm:ss A"),
		};
	});

	const handleExport = () => {
		const fileType =
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
		const fileExtension = ".xlsx";
		const ws = XLSX.utils.json_to_sheet(exportData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, "Log" + new Date() + fileExtension);
	};

	const handleStart = (date: Date) => {
		setFilter((prev: TFilter) => {
			const curr = { ...prev, start: date };
			return curr;
		});
	};

	const handleEnd = (date: Date) => {
		setFilter((prev: TFilter) => {
			const curr = { ...prev, end: date };
			return curr;
		});
	};

	return (
		<>
			<Flex justify="space-between" align="center" gap="2rem">
				<Box sx={{ flex: 0.5 }} miw="100px">
					<Text size="20px" weight="600">
						ประวัติการใช้งาน
					</Text>
					<Text size="12px" weight="500" color="#B5B5C3">
						{logsData.count} ครั้ง
					</Text>
				</Box>

				<Input
					miw="600px"
					value={filter.value}
					onChange={(e) => {
						setFilter((prev) => ({ ...prev, value: e.target.value }));
					}}
					styles={{
						rightSection: {
							borderLeft: "1px solid #ced4da",
							width: "130px",
						},
					}}
					rightSection={
						<Select
							styles={{
								wrapper: {
									marginRight: "1px",
								},
								input: {
									border: "none",
									"&:focus": { outline: "none" },
								},
							}}
							onChange={(e: TFilterType) => {
								setFilter((prev) => ({ ...prev, type: e }));
							}}
							defaultValue={"STUDENT CODE"}
							placeholder="Pick one"
							data={[
								{ value: "STUDENT CODE", label: "รหัสนักศึกษา" },
								{ value: "NAME", label: "ชื่อ" },
								{ value: "TEL", label: "เบอร์" },
							]}
						/>
					}
					icon={<IconSearch size="1rem" />}
					size="md"
					placeholder="Search"
					sx={{ flex: 3 }}
				/>

				<Button
					color="red"
					size="md"
					sx={{ flex: 0.75 }}
					miw="150px"
					onClick={() => handleExport()}
				>
					<Group spacing="xs" noWrap>
						<IconFileExport size="1rem" />
						<Text>นำออกไฟล์ Excel</Text>
					</Group>
				</Button>
			</Flex>
			<Flex direction="column" mt="sm">
				<Box>
					<Text weight="500">ช่วงเวลา : </Text>
					<Group>
						<DateTimePicker
							clearable
							valueFormat="DD/MM/YYYY HH:mm A"
							placeholder="Pick date and time"
							value={filter.start}
							onChange={handleStart}
							maw={500}
						/>
						<Text>ถึง</Text>
						<DateTimePicker
							clearable
							valueFormat="DD/MM/YYYY HH:mm A"
							placeholder="Pick date and time"
							value={filter.end}
							onChange={handleEnd}
							maw={500}
						/>
					</Group>
				</Box>
			</Flex>
		</>
	);
}

export default SearchBar;