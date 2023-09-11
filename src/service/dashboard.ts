import { fetchPrivate } from ".";
import { IResLogResponse, IResUserResponse, IResponse, TUser } from "../types";

export const allMembersService = async ({
	type = "",
	value = "",
	order = "STUDENT CODE",
	sort = "ASC",
}) => {
	return await fetchPrivate.get<IResponse<IResUserResponse>>(
		`/users?type=${type}&value=${value}&order=${order}&sort=${sort}`
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

export const allModeratorsService = async ({ type = "", value = "" }) => {
	return await fetchPrivate.get<IResponse<IResUserResponse>>(
		`/moderators?type=${type}&value=${value}`
	);
};

export const updateModeratorService = async ({
	id,
	...payload
}: TUser & { id: number }) => {
	return await fetchPrivate.put<TUser>(`/moderators/${id}`, payload);
};

export const deleteModeratorService = async (id: number) => {
	return await fetchPrivate.delete(`/moderators/${id}`);
};

export const allLogsService = async ({
	type = "",
	value = "",
	order = "STUDENT CODE",
	sort = "ASC",
}) => {
	return await fetchPrivate.get<IResponse<IResLogResponse>>(
		`/logs?type=${type}&value=${value}&order=${order}&sort=${sort}`
	);
};

export const deleteLogService = async (id: number) => {
	return await fetchPrivate.delete(`/logs/${id}`);
};
