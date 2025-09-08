import type { FC, HTMLAttributes } from "react";
import styles from "./MainContent.module.css";

type State = HTMLAttributes<HTMLDivElement> & {
	hFull?: boolean;
};

const MainContent: FC<State> = (props) => {
	const { className = "", hFull = false, children, ...rest } = props;
	return (
		<div {...rest} className={`${styles.mainWrap} ${className}`}>
			<div
				className={styles.mainContent}
				style={{ height: hFull ? "100dvh" : "auto" }}
			>
				{children}
			</div>
		</div>
	);
};

export default MainContent;
