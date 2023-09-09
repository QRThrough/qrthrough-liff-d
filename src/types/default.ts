export interface IResponse<T = any> {
	success: boolean;
	message?: string;
	result?: T;
}

export interface IResponseNotUndefined<T = any> {
	success: boolean;
	message: string;
	result: T;
}
