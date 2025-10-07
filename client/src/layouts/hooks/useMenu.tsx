import { IconBuilding } from "@tabler/icons-react";

const MENU = [
	{
		key: "/manager",
		type: "group",
		label: "Manager",
	},
	{
		key: "/",
		type: "item",
		label: "Dashboard",
		icon: <IIonSpeedometer />,
	},
	{
		key: "/branches",
		type: "item",
		label: "Branches",
		icon: <IconBuilding />,
	},
	{
		key: "/lockers",
		type: "item",
		label: "Lockers",
		icon: <IIonLockOpen />,
	},
	{
		key: "/users",
		type: "item",
		label: "Users",
		icon: <IIonPeople />,
	},
	{
		key: "/system",
		type: "group",
		label: "System",
	},
	{
		key: "/settings",
		type: "item",
		label: "Settings",
		icon: <IIonConstruct />,
	},
];

export const useMenu = () => {
	return { menu: MENU };
};
