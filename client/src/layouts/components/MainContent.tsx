import type { FC, HTMLAttributes } from "react";
import styles from "./MainContent.module.css";

type State = HTMLAttributes<HTMLDivElement>;

const MainContent: FC<State> = (props) => {
	const { className = "", ...rest } = props;
	return <div {...rest} className={`${styles["main-content"]} ${className}`} />;
};

export default MainContent;
