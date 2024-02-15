import { Box, Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Role, TUser } from "../../../../types";
import { useUserDataContext } from "../../../../context/userData";

interface IEditMember {
	data: TUser | null;
	handleSubmitEdit: (values: {
		firstname: string;
		lastname: string;
		tel: string;
		role: Role;
	}) => void;
	setSeleted: React.Dispatch<React.SetStateAction<TUser | null>>;
	close: () => void;
}

function EditForm({ data, handleSubmitEdit, setSeleted, close }: IEditMember) {
	const { userData } = useUserDataContext();
	const form = useForm({
		initialValues: {
			firstname: data?.firstname ?? "",
			lastname: data?.lastname ?? "",
			tel: data?.tel ?? "",
			role: data?.role ?? "USER",
		},

		validate: {
			firstname: (value) =>
				/^.{1,256}$/.test(value) ? null : "กรุณากรอกชื่อตามจริง",
			lastname: (value) =>
				/^.{1,256}$/.test(value) ? null : "กรุณากรอกนามสกุลตามจริง",
			tel: (value) =>
				/^\d{9,10}$/.test(value)
					? null
					: "กรุณากรอกเบอร์โทรศัพท์ 9 - 10 ตัวเลข",
		},
	});
	return (
		<Box mx="auto">
			<form onSubmit={form.onSubmit((values) => handleSubmitEdit(values))}>
				<TextInput
					readOnly
					label="รหัสนักศึกษา"
					placeholder="รหัสนักศึกษา"
					styles={{
						label: {
							fontSize: "1.1rem",
							fontWeight: 400,
						},
					}}
					value={data?.account_id ?? ""}
				/>
				<TextInput
					mt="sm"
					withAsterisk
					required
					label="ขื่อ"
					placeholder="ชื่อ"
					styles={{
						label: {
							fontSize: "1.1rem",
							fontWeight: 400,
						},
					}}
					{...form.getInputProps("firstname")}
				/>
				<TextInput
					mt="sm"
					withAsterisk
					required
					label="นามสกุล"
					placeholder="นามสกุล"
					styles={{
						label: {
							fontSize: "1.1rem",
							fontWeight: 400,
						},
					}}
					{...form.getInputProps("lastname")}
				/>
				<TextInput
					mt="sm"
					withAsterisk
					required
					label="เบอร์โทรศัพท์"
					placeholder="0891234567"
					styles={{
						label: {
							fontSize: "1.1rem",
							fontWeight: 400,
						},
					}}
					{...form.getInputProps("tel")}
				/>
				{userData && userData.role === "ADMIN" && (
					<Select
						mt="sm"
						label="ตำแหน่ง"
						placeholder="Pick one"
						dropdownPosition="top"
						styles={{
							label: {
								fontSize: "1.1rem",
								fontWeight: 400,
							},
						}}
						data={[
							{ value: "ADMIN", label: "แอดมิน" },
							{ value: "MODERATOR", label: "ผู้ควบคุม" },
							{ value: "USER", label: "ผู้ใช้" },
						]}
						{...form.getInputProps("role")}
					/>
				)}
				<Group position="right" mt="md">
					<Button
						variant="outline"
						onClick={() => {
							setSeleted(null);
							close();
						}}
					>
						ยกเลิก
					</Button>
					<Button type="submit">ยืนยัน</Button>
				</Group>
			</form>
		</Box>
	);
}

export default EditForm;
