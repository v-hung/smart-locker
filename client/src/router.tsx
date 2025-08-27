import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				lazy: () => import("./layouts/MainLayout"),
				children: [
					{
						index: true,
						lazy: () => import("./pages/home/HomePage"),
					},
					{
						path: "lockers",
						lazy: () => import("./pages/locker/LockerPage"),
					},
				],
			},
			{
				path: "auth",
				lazy: () => import("./layouts/AuthLayout"),
				children: [
					{
						path: "login",
						lazy: () => import("./pages/auth/LoginPage"),
					},
				],
			},
		],
	},
]);

export default router;
