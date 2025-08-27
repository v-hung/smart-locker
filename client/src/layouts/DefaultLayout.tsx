import { NavLink, Outlet } from "react-router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import styles from "./DefaultLayout.module.css";
import {
	ActionIcon,
	Anchor,
	Avatar,
	Breadcrumbs,
	Button,
	Menu,
	ScrollArea,
} from "@mantine/core";
import { useMenu } from "@/hooks/useMenu";

// https://dribbble.com/shots/18895539-Modern-Admin-Dashboard-UI-Design-for-Flup-Furniture-App-Website

const useMenuStore = create(
	persist<{ isMenuOpen: boolean }>(
		(set) => ({
			isMenuOpen: true,
		}),
		{
			name: "menu-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export function Component() {
	const isMenuOpen = useMenuStore((state) => state.isMenuOpen);

	const { menu } = useMenu();

	return (
		<div
			className={`${styles.layout} ${isMenuOpen ? styles["layout-menu-collapsed"] : ""}`}
		>
			<div className={styles.menu}>
				<div className={styles["menu-logo"]}>
					<img src="./logo_min.png" alt="logo" />
					<span>Smart Locker</span>
					<button
						className={"menu-toggle"}
						onClick={() =>
							useMenuStore.setState((state) => ({
								isMenuOpen: !state.isMenuOpen,
							}))
						}
					>
						{isMenuOpen ? <IIonChevronBack /> : <IIonChevronForward />}
					</button>
				</div>

				<ScrollArea className={styles["menu-nav"]}>
					{menu.map((v) =>
						v.type == "group" ? (
							<div key={v.key} className={styles["menu-group"]}>
								{v.label}
							</div>
						) : (
							<NavLink
								key={v.key}
								to={v.key}
								className={({ isActive }) =>
									`${styles["menu-item"]} ${isActive ? styles["menu-item-active"] : ""}`
								}
							>
								<span className={styles["menu-item-icon"]}>{v.icon}</span>
								<span className={styles["menu-item-label"]}>{v.label}</span>
							</NavLink>
						),
					)}

					<Menu shadow="md" width={200} position="top">
						<Menu.Target>
							<div className={styles["menu-footer"]}>
								<Avatar color="cyan" radius="xl">
									VH
								</Avatar>
								<div className="profile">
									<p className="profile-name">Việt Hùng</p>
									<p className="profile-role">Admin Manager</p>
								</div>
							</div>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Label>Account</Menu.Label>
							<Menu.Item leftSection={<IIonPersonOutline width={18} />}>
								Profile
							</Menu.Item>
							<Menu.Item
								color="red"
								leftSection={<IIonTrashOutline width={18} />}
							>
								Logout
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</ScrollArea>
			</div>

			<div className={styles.main}>
				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
