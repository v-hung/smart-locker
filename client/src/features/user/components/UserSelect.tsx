import type { InfiniteSelectState } from "@/components/inputs/InfiniteSelect/InfiniteSelect";
import InfiniteSelect, {
	type InfiniteSelectItem,
} from "@/components/inputs/InfiniteSelect/InfiniteSelect";
import { useEffect, useState, type FC } from "react";
import { useUsers } from "../hooks/useUsers";
import { useDebouncedCallback } from "@mantine/hooks";

export type UserSelectState = InfiniteSelectState & {};

const UserSelect: FC<UserSelectState> = (props) => {
	const { defaultValue, ...rest } = props;

	const [options, setOptions] = useState<InfiniteSelectItem[]>([]);
	const {
		loading,
		paginationInput,
		setPaginationInput,
		paginatedData,
		search,
		record,
		getById,
	} = useUsers();

	const initDropdownOnOpen = () => {
		search(paginationInput);
	};

	const [isSearching, setIsSearching] = useState(false);
	const handleSearch = useDebouncedCallback(async (query: string = "") => {
		const input = {
			...paginationInput,
			q: query,
		};

		setPaginationInput(input);
		search(input);
		setIsSearching(query.length > 0);
	}, 300);

	const handleScroll = () => {};

	useEffect(() => {
		if (defaultValue) {
			getById(defaultValue);
		}
	}, []);

	useEffect(() => {
		const combinedData = [
			...paginatedData.data,
			...(record && !isSearching ? [record] : []),
		];

		const merge = [
			...options,
			...combinedData.map<InfiniteSelectItem>((item) => ({
				label: item.email,
				value: item.id.toString(),
			})),
		];
		const newOptions = Array.from(
			new Map(merge.map((item) => [item.value, item])).values(),
		);

		setOptions(newOptions);
	}, [paginatedData, record]);

	return (
		<InfiniteSelect
			defaultValue={defaultValue}
			data={options}
			loading={loading}
			initDropdownOnOpen={initDropdownOnOpen}
			onSearch={handleSearch}
			onScroll={handleScroll}
			{...rest}
		/>
	);
};

export default UserSelect;
