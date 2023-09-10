import {
	Navigate,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import SignInPage from "../page/SignInPage";
import UserPage from "../page/dashboard/members/UserPage";
import LogPage from "../page/dashboard/usageLogs/LogPage";
import ModeratorPage from "../page/dashboard/members/ModeratorPage";
import DashboardPage from "../page/dashboard/DashboardPage";
import DashboardLayout from "../common/layout/DashboardLayout";
import PageLayout from "../common/layout/PageLayout";
import { TuserData } from "../types";
import { useUserDataContext } from "../context/userData";
import liff from "@line/liff";

interface ICustomRoute {
	user: TuserData;
	redirectPath: string;
	children: JSX.Element;
}

const AuthRoute = ({ user, redirectPath, children }: ICustomRoute) => {
	if (!user || user.role === "USER" || !liff.isLoggedIn()) return children;
	//if (!user || user.role === "USER") return children;
	return <Navigate to={redirectPath} replace />;
};

const ProtectRoute = ({ user, redirectPath, children }: ICustomRoute) => {
	if (user && user.role !== "USER" && liff.isLoggedIn()) return children;
	//if (user && user.role !== "USER") return children;
	return <Navigate to={redirectPath} replace />;
};

const Router = () => {
	const { userData } = useUserDataContext();
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route
					index
					element={
						<AuthRoute user={userData} redirectPath="/dashboard">
							<PageLayout isCenter maxWidth="1440px">
								<SignInPage />
							</PageLayout>
						</AuthRoute>
					}
				/>
				<Route
					path="dashboard"
					element={
						<ProtectRoute user={userData} redirectPath="/">
							<DashboardLayout />
						</ProtectRoute>
					}
				>
					<Route index element={<DashboardPage />} />
					<Route path="user" element={<UserPage />} />
					<Route path="log" element={<LogPage />} />
					<Route path="moderator" element={<ModeratorPage />} />
				</Route>
			</Route>
		)
	);
	return <RouterProvider router={router} />;
};

export default Router;
