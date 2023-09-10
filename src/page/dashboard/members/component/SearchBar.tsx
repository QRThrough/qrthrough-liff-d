import {
	Group,
	Box,
	Text,
	Input,
	Button,
	Flex,
	Chip,
	Select,
} from "@mantine/core";
import { IconFileExport, IconSearch } from "@tabler/icons-react";
import { IResUserResponse, TFilter, TFilterType } from "../../../../types";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface ISearchMember {
	moderatorPage: boolean;
	membersData: IResUserResponse;
	filter: TFilter;
	setFilter: React.Dispatch<React.SetStateAction<TFilter>>;
}

function SearchBar({
	moderatorPage = false,
	membersData,
	filter,
	setFilter,
}: ISearchMember) {
	const exportData = membersData.users.map((e) => {
		let regType = "";
		switch (e.flag) {
			case "NOTFOUND":
				regType = "ไม่มีในฐานข้อมูล";
				break;
			case "FOUND":
				regType = "พบในฐานข้อมูล";
				break;
			case "EDIT":
				regType = "เปลี่ยนข้อมูล";
				break;
			default:
				break;
		}
		return {
			["รหัสนักศึกษา"]: e.student_code,
			["ชื่อ"]: e.firstname,
			["นามสกุล"]: e.lastname,
			["เบอร์"]: String(e.tel),
			["ชนิดการสมัคร"]: regType,
			["วันที่สมัคร"]: dayjs(e.created_at)
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
		FileSaver.saveAs(
			data,
			`${moderatorPage ? "Moderators" : "Users"}` + new Date() + fileExtension
		);
	};

	// Converts your Array<Object> to a CsvOutput string based on the configs

	const handleFlag = (flag: string[]) => {
		setFilter((prev: TFilter) => {
			const curr = { ...prev, flag: flag };
			return curr;
		});
	};

	const handleStatus = (status: string[]) => {
		setFilter((prev: TFilter) => {
			const curr = { ...prev, status: status };
			return curr;
		});
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
						{moderatorPage ? "ผู้ควบคุม" : "ผู้ใช้งาน"}
					</Text>
					<Text size="12px" weight="500" color="#B5B5C3">
						{membersData.count} คน
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
			{!moderatorPage && (
				<Flex direction="column" mt="sm">
					<Box>
						<Text weight="500">ชนิดการสมัคร : </Text>
						<Chip.Group multiple value={filter.flag} onChange={handleFlag}>
							<Group>
								<Chip value="FOUND">พบในฐานข้อมูล</Chip>
								<Chip value="EDIT">เปลี่ยนข้อมูล</Chip>
								<Chip value="NOTFOUND">ไม่มีในฐานข้อมูล</Chip>
							</Group>
						</Chip.Group>
					</Box>
					<Box>
						<Text weight="500">สถานะ : </Text>
						<Chip.Group multiple value={filter.status} onChange={handleStatus}>
							<Group>
								<Chip value="Active">เปิดใช้งาน</Chip>
								<Chip value="Inactive">ไม่เปิดใช้งาน</Chip>
							</Group>
						</Chip.Group>
					</Box>
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
			)}
		</>
	);
}

export default SearchBar;
