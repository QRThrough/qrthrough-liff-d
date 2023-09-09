import { Role } from ".";

export type TuserData = {
	role: Role;
} | null;

export interface IResUserDataResponse {
	role: Role;
}
