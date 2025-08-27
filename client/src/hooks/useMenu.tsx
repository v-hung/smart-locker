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
		key: "/locker",
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
		key: "/marketing",
		type: "item",
		label: "Marketing",
		icon: <IIonPeople />,
	},
	{
		key: "/marketplace",
		type: "item",
		label: "Marketplace",
		icon: <IIonStorefront />,
	},
	{
		key: "/discounts",
		type: "item",
		label: "Discounts",
		icon: <IIonPricetag />,
	},
	{
		key: "/payments",
		type: "item",
		label: "Payments",
		icon: <IIonCard />,
	},
	{
		key: "/ledger",
		type: "item",
		label: "Ledger",
		icon: <IIonBook />,
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
