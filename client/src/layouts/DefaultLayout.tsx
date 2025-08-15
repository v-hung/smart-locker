import { NavLink, Outlet } from "react-router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import styles from "./DefaultLayout.module.css";
import { ActionIcon, Button } from "@mantine/core";

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
	];

	return (
		<div
			className={`${styles.layout} ${isMenuOpen ? styles["layout-menu-collapsed"] : ""}`}
		>
			<div className={styles.menu}>
				<div>
					{menu.map((v) => (
						<NavLink
							key={v.path}
							to={v.path}
							className={({ isActive }) =>
								`${styles["menu-item"]} ${isActive ? styles["menu-item-active"] : ""}`
							}
						>
							<div className={styles["menu-item-icon"]}>{v.icon}</div>
							<span className={styles["menu-item-label"]}>{v.label}</span>
						</NavLink>
					))}
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
				</header>

				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
