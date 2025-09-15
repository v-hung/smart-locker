import InfiniteSelect, {
	type InfiniteSelectProps,
} from "@/components/inputs/InfiniteSelect/InfiniteSelect";
import type { FC } from "react";

export type BranchSelectState = InfiniteSelectProps & {
	withoutIds?: string[];
};

const BranchSelect: FC<BranchSelectState> = (props) => {
	const { ...rest } = props;

	return <InfiniteSelect {...rest} />;
};

export default BranchSelect;
