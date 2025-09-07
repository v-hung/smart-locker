import type { FC, HTMLAttributes } from "react";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import styles from "./MainHeader.module.css";
import { useNavigate } from "react-router";

type State = HTMLAttributes<HTMLDivElement> & {
	title: string;
	subTitle?: string;
	description?: string;
	rightSection?: React.ReactNode;
	breadcrumbs?: { label: string; path?: string }[];
	sticky?: boolean;
};

const MainHeader: FC<State> = (props) => {
	const {
		className = "",
		title = "",
		subTitle = "",
		description = "",
		rightSection: rightEl,
		breadcrumbs = [],
		sticky = false,
		...rest
	} = props;

	const navigate = useNavigate();

	const handelBreadcrumbClick = (path?: string) => {
		if (path) {
			navigate(path);
		}
	};

	return (
		<div
			{...rest}
			className={`${styles.mainHeader} ${sticky ? styles.mainHeaderSticky : ""} ${className}`}
		>
			<div className={styles.headerContainer}>
				<div className={styles.headerLeft}>
					<Breadcrumbs separator={<IconChevronRight size={14} />}>
						<Anchor>Dashboard</Anchor>
						{breadcrumbs.map((v, i) => (
							<Anchor key={i} onClick={() => handelBreadcrumbClick(v.path)}>
								{v.label}
							</Anchor>
						))}
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
