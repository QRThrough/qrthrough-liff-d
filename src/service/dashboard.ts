import { fetchPrivate } from ".";
import { IResUserResponse, IResponse, TUser } from "../types";

export const allMembersService = async ({ type = "", value = "" }) => {
	return await fetchPrivate.get<IResponse<IResUserResponse>>(
		`/users?type=${type}&value=${value}`
	);
};

export const updateMemberService = async ({
	id,
	...payload
}: TUser & { id: number }) => {
	return await fetchPrivate.put<TUser>(`/users/${id}`, payload);
};

export const deleteMemberService = async (id: number) => {
	return await fetchPrivate.delete(`/users/${id}`);
};
