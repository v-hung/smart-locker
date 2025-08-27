import type { FC, HTMLAttributes } from "react";
import "./MainHeader.css";

type State = HTMLAttributes<HTMLDivElement> & {
	title: string;
	description?: string;
	rightEl?: React.ReactNode;
};

const MainHeader: FC<State> = (props) => {
	const { className = "", title = "", description, rightEl, ...rest } = props;
	return (
		<div {...rest} className={`main-header ${className}`}>
			<div className="header-left">
				<span className="header-title">{title}</span>
			</div>

			<div className="header-right">{rightEl ? rightEl : null}</div>
		</div>
	);
};

export default MainHeader;
