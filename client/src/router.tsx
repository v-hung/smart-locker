import { createBrowserRouter, Navigate, Outlet } from "react-router";
import App from "./App";
import { LockerProvider } from "./features/locker/contexts/LockerContext";

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
						element: (
							<LockerProvider>
								<Outlet />
							</LockerProvider>
						),
						children: [
							{
								index: true,
								lazy: () => import("./pages/locker/LockerPage"),
							},
							{
								path: "create",
								lazy: () => import("./pages/locker/LockerCreateEditPage"),
							},
							{
								path: ":id/edit",
								lazy: () => import("./pages/locker/LockerCreateEditPage"),
							},
						],
					},
					{
						path: "users",
						element: (
							<LockerProvider>
								<Outlet />
							</LockerProvider>
						),
						children: [
							{
								index: true,
								lazy: () => import("./pages/locker/LockerPage"),
							},
							{
								path: "create",
								lazy: () => import("./pages/locker/LockerCreateEditPage"),
							},
							{
								path: ":id/edit",
								lazy: () => import("./pages/locker/LockerCreateEditPage"),
							},
						],
					},
					{
						path: "branches",
						element: (
							<LockerProvider>
								<Outlet />
							</LockerProvider>
						),
						children: [
							{
								index: true,
								lazy: () => import("./pages/locker/LockerPage"),
							},
							{
								path: "create",
								lazy: () => import("./pages/locker/LockerCreateEditPage"),
							},
							{
								path: ":id/edit",
								lazy: () => import("./pages/locker/LockerCreateEditPage"),
							},
						],
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
