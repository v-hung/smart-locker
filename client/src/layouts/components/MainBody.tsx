import type { FC, HTMLAttributes } from "react";
import styles from "./MainBody.module.css";

type State = HTMLAttributes<HTMLDivElement> & {
	grow?: boolean;
};

const MainBody: FC<State> = (props) => {
	const { className = "", grow = false, ...rest } = props;
	return (
		<div
			{...rest}
			className={`${styles.mainBody} ${className}`}
			style={{ flexGrow: grow ? 1 : "initial" }}
		/>
	);
};

export default MainBody;
