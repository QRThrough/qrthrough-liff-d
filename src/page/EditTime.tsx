import { Group, Button, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { TController } from "../types";

interface IEditTime {
	data: TController[] | null;
	handleChangeTime: (value: { openTime: string; closeTime: string }) => void;
	close: () => void;
}

function EditTime({ data, handleChangeTime, close }: IEditTime) {
	const form = useForm({
		initialValues: {
			openTime: data?.filter((e) => e.key === "Open")[0].value ?? "00:00",
			closeTime: data?.filter((e) => e.key === "Close")[0].value ?? "00:00",
		},

		validate: {
			openTime: (value) =>
				/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)
					? null
					: "กรอกเวลาตามรูปแบบ 00:00",
			closeTime: (value) =>
				/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)
					? null
					: "กรอกเวลาตามรูปแบบ 00:00",
		},
	});

	return (
		<form onSubmit={form.onSubmit((values) => handleChangeTime(values))}>
			<Group>
				<TimeInput
					required
					w="min-content"
					withAsterisk
					{...form.getInputProps("openTime")}
				/>
				<Text weight={400} size="md">
					ถึง
				</Text>
				<TimeInput
					required
					w="min-content"
					withAsterisk
					{...form.getInputProps("closeTime")}
				/>
			</Group>

			<Group position="right" mt="md">
				<Button
					variant="outline"
					onClick={() => {
						close();
					}}
				>
					ยกเลิก
				</Button>
				<Button type="submit">ยืนยัน</Button>
			</Group>
		</form>
	);
}

export default EditTime;
