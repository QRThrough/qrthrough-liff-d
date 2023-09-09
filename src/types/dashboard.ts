export type Role = "ADMIN" | "MODERATOR" | "USER";
export type Flag = "FOUND" | "NOTFOUND" | "EDIT";

export type TFilterType = "STUDENT CODE" | "TEL" | "NAME";

export type TFilter = {
	value: string;
	type: TFilterType;
	flag: string[];
	status: string[];
	start: Date;
	end: Date;
};

export type TUser = {
	id: number;
	line_id: string;
	student_code: number;
	firstname: string;
	lastname: string;
	tel: string;
	flag: Flag;
	role: Role;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
};

export interface IResUserResponse {
	count: number;
	users: TUser[];
}
