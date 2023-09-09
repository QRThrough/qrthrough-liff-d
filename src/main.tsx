import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import theme from "./theme";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalsProvider } from "@mantine/modals";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<MantineProvider theme={theme}>
			<ModalsProvider>
				<App />
			</ModalsProvider>
		</MantineProvider>
	</QueryClientProvider>
);
