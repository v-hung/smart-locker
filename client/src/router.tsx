import { createBrowserRouter, Navigate, Outlet } from "react-router";
import App from "./App";
import { LockerProvider } from "./features/locker/contexts/LockerContext";
import { BranchProvider } from "./features/branch/contexts/BranchContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		hydrateFallbackElement: <div></div>,
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
						lazy: () => import("./pages/branch/BranchLayout"),
						children: [
							{
								index: true,
								lazy: () => import("./pages/branch/BranchPage"),
							},
							{
								path: "create",
								lazy: () => import("./pages/branch/BranchCreateEditPage"),
							},
							{
								path: ":id/edit",
								lazy: () => import("./pages/branch/BranchCreateEditPage"),
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
