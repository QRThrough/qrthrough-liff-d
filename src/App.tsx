import { useState } from "react";
import "./App.css";
import AppLayout from "./common/layout/AppLayout";
import { UserDataContext } from "./context/userData";
import Router from "./router";
import { CustomFonts } from "./theme/CustomFonts";
import { Notifications } from "@mantine/notifications";
import { TuserData } from "./types";

function App() {
	const [userData, setUserData] = useState<TuserData>(null);
	return (
		<>
			<AppLayout>
				<UserDataContext.Provider value={{ userData, setUserData }}>
					<CustomFonts />
					<Notifications />
					<Router />
				</UserDataContext.Provider>
			</AppLayout>
		</>
	);
}

export default App;
