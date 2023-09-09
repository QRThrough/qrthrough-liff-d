import liff from "@line/liff";
import axios from "axios";

export const fetchPrivate = (() => {
	const getAuthToken = async () => {
		try {
			const idToken = liff.getIDToken();
			if (typeof idToken === "string") {
				return "Bearer " + liff.getIDToken();
			} else throw Error("ID Token not a string");
		} catch (err) {
			console.log("getAuthToken", err);
		}
	};

	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
	});

	instance.interceptors.request.use(async (config) => {
		config.headers.Authorization = await getAuthToken();
		return config;
	});

	return instance;
})();

export const fetchPublic = (() => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
	});

	return instance;
})();
