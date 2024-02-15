import { fetchPrivate } from ".";
import {
	IResLogResponse,
	IResUserResponse,
	IResponse,
	TController,
	TUser,
} from "../types";

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
	account_id,
	...payload
}: TUser) => {
	return await fetchPrivate.put<TUser>(`/users/${account_id}`, payload);
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
	account_id,
	...payload
}: TUser) => {
	return await fetchPrivate.put<TUser>(`/moderators/${account_id}`, payload);
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

// export const deleteLogService = async (id: number) => {
// 	return await fetchPrivate.delete(`/logs/${id}`);
// };

export const getDashboardService = async () => {
	return await fetchPrivate.get<IResponse<TController[]>>(`/configurations`);
};

export const updateDashboardService = async (payload: TController[]) => {
	return await fetchPrivate.put<TController[]>(`/configurations`, payload);
};
