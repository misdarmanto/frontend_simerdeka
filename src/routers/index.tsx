import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/appLayout";
import ErrorPage from "../error-page";
import { useContext } from "react";
import { RootContext } from "../utils/contextApi";
import { UserTypes } from "../models/user";
import { studentRouters } from "./student-routes";
import { departmentRouters } from "./department-routers";
import { lp3mRouters } from "./lp3m-routers";
import { academicRouters } from "./academic-routers";
import { useAppContext } from "../context/app.context";

export default function AppRouters() {
	const { currentUser } = useAppContext();

	let router: { path: string; element: JSX.Element }[] = [];

	switch (currentUser.userRole) {
		case "student":
			router = studentRouters;
			break;
		case "studyProgram":
			router = studentRouters;
			break;
		case "department":
			router = departmentRouters;
			break;
		case "lp3m":
			router = lp3mRouters;
			break;
		case "academic":
			router = academicRouters;
			break;
		default:
			break;
	}

	const routers = createBrowserRouter([
		{
			path: "/",
			element: <AppLayout />,
			errorElement: <ErrorPage />,
			children: router,
		},
	]);

	return <RouterProvider router={routers} />;
}