import { NavLink, Outlet } from "react-router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import styles from "./DefaultLayout.module.css";
import {
	ActionIcon,
	Anchor,
	Breadcrumbs,
	Button,
	ScrollArea,
} from "@mantine/core";

// https://dribbble.com/shots/18895539-Modern-Admin-Dashboard-UI-Design-for-Flup-Furniture-App-Website

const useMenuStore = create(
	persist<{ isMenuOpen: boolean }>(
		(set) => ({
			isMenuOpen: true,
		}),
		{
			name: "menu-storage",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);

export function Component() {
	const isMenuOpen = useMenuStore((state) => state.isMenuOpen);

	const menu = [
		{
			path: "/",
			icon: <IIonCameraOutline className="shrink-0" />,
			label: "OpenCV + EasyOCR",
		},
		{
			path: "/2",
			icon: <IIonCameraOutline className="shrink-0" />,
			label: "OpenCV + EasyOCR",
		},
		{
			path: "/3",
			icon: <IIonCameraOutline className="shrink-0" />,
			label: "OpenCV + EasyOCR",
		},
		{
			path: "/4",
			icon: <IIonCameraOutline className="shrink-0" />,
			label: "OpenCV + EasyOCR",
		},
	];

	return (
		<div
			className={`${styles.layout} ${isMenuOpen ? styles["layout-menu-collapsed"] : ""}`}
		>
			<div className={styles.menu}>
				<div className={styles["menu-logo"]}>
					<img src="./logo_min.png" alt="logo" style={{ width: "30px" }} />
					Smart Locker
				</div>
				<ScrollArea className={styles["menu-nav"]}>
					{menu.map((v) => (
						<NavLink
							key={v.path}
							to={v.path}
							className={({ isActive }) =>
								`${styles["menu-item"]} ${isActive ? styles["menu-item-active"] : ""}`
							}
						>
							<span className={styles["menu-item-icon"]}>{v.icon}</span>
							<span className={styles["menu-item-label"]}>{v.label}</span>
						</NavLink>
					))}
				</ScrollArea>
				<div className={styles["menu-footer"]}>
					<span className={styles["icon"]}></span>
					<span className={styles["menu-item-label"]}>gdfsg</span>
					<span className={styles["icon"]}>gdfg</span>
				</div>
			</div>

			<div className={styles.main}>
				<header className={styles.header}>
					<ActionIcon
						onClick={() =>
							useMenuStore.setState((state) => ({
								isMenuOpen: !state.isMenuOpen,
							}))
						}
					>
						{isMenuOpen ? <IIonMenu /> : <IIonClose />}
					</ActionIcon>
					<Breadcrumbs>
						<Anchor>fsaf</Anchor>
						<Anchor>fsaf</Anchor>
						<Anchor>fsaf</Anchor>
					</Breadcrumbs>
				</header>

				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
