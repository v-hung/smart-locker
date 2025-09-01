import type { FC, HTMLAttributes } from "react";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import styles from "./MainHeader.module.css";

type State = HTMLAttributes<HTMLDivElement> & {
	title: string;
	subTitle?: string;
	description?: string;
	rightSection?: React.ReactNode;
};

const MainHeader: FC<State> = (props) => {
	const {
		className = "",
		title = "",
		subTitle = "",
		description = "",
		rightSection: rightEl,
		...rest
	} = props;

	return (
		<div {...rest} className={`${styles.mainHeader} ${className}`}>
			<div className={styles.headerContainer}>
				<div className={styles.headerLeft}>
					<Breadcrumbs separator={<IconChevronRight size={14} />}>
						<Anchor>Dashboard</Anchor>
						<Anchor>Lockers</Anchor>
						<Anchor>Create a locker</Anchor>
					</Breadcrumbs>
				</div>
				<div className={styles.headerRight}>{rightEl ? rightEl : null}</div>
			</div>
			<div className={styles.headerSecond}>
				<span className={styles.headerTitle}>{title}</span>
				<span className={styles.headerSubTitle}>{subTitle}</span>
				<p className={styles.headerDescription}>{description}</p>
			</div>
		</div>
	);
};

export default MainHeader;
