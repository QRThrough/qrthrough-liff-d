import { defineConfig } from "vite";
import { load } from "dotenv-extended";
import react from "@vitejs/plugin-react-swc";

function loadEnv(mode: string) {
	const m = mode === "development" ? "dev" : "prod";

	const loadedEnv = load({
		path: `env/.env.${m}`,
		errorOnMissing: true,
	});

	return loadedEnv;
}

export default defineConfig(({ command, mode }) => {
	loadEnv(mode);

	return {
		plugins: [react()],
		server: {
			host: process.env["HOST"] || "127.0.0.1",
			port: Number(process.env["PORT"] || 3002),
			strictPort: true,
		},
	};
});
