import { fetchPrivate } from ".";

import { IResUserDataResponse, IResponseNotUndefined } from "../types";

export const signInService = async () => {
	return await fetchPrivate.get<IResponseNotUndefined<IResUserDataResponse>>(
		`/signin`
	);
};
