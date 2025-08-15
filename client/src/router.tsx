import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				lazy: () => import("./layouts/DefaultLayout"),
				children: [
					{
						index: true,
						lazy: () => import("./pages/HomePage"),
					},
				],
			},
		],
	},
]);

export default router;
