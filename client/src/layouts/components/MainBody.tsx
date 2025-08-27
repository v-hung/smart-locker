import type { FC, HTMLAttributes } from "react";
import styles from "./MainBody.module.css";

type State = HTMLAttributes<HTMLDivElement>;

const MainBody: FC<State> = (props) => {
	const { className = "", ...rest } = props;
	return <div {...rest} className={`${styles["main-body"]} ${className}`} />;
};

export default MainBody;
