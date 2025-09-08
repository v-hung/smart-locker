import InfiniteSelect, {
	type InfiniteSelectState,
} from "@/components/inputs/InfiniteSelect/InfiniteSelect";
import type { FC } from "react";

export type LockerSelectState = InfiniteSelectState & {
	withoutIds?: string[];
};

const LockerSelect: FC<LockerSelectState> = (props) => {
	const { ...rest } = props;

	return <InfiniteSelect {...rest} />;
};

export default LockerSelect;
