import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";

export function Component() {
	return (
		<div className={styles.container}>
			<Outlet />
		</div>
	);
}
