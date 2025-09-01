import type { FC, HTMLAttributes } from "react";
import styles from "./MainContent.module.css";

type State = HTMLAttributes<HTMLDivElement> & {
	hFull?: boolean;
};

const MainContent: FC<State> = (props) => {
	const { className = "", hFull = false, ...rest } = props;
	return (
		<div
			{...rest}
			className={`${styles.mainContent} ${className}`}
			style={{ height: hFull ? "100dvh" : "auto" }}
		/>
	);
};

export default MainContent;
