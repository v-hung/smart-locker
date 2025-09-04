import {
	useEffect,
	useMemo,
	useRef,
	useState,
	type ChangeEvent,
	type Dispatch,
	type FC,
	type SetStateAction,
} from "react";
import {
	Combobox,
	useCombobox,
	TextInput,
	ScrollArea,
	Loader,
	rem,
	type TextInputProps,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

/** Giả lập API – thay bằng API thật của bạn */
type Item = { value: string; label: string };
const PAGE_SIZE = 20;

async function fetchOptions(
	query: string,
	page: number,
): Promise<{
	items: Item[];
	hasMore: boolean;
}> {
	const ALL: Item[] = Array.from({ length: 100 }).map((_, i) => ({
		value: String(i + 1),
		label: `Option ${i + 1}`,
	}));

	const filtered = query
		? ALL.filter((i) =>
				i.label.toLowerCase().includes(query.trim().toLowerCase()),
			)
		: ALL;

	const start = page * PAGE_SIZE;
	const end = start + PAGE_SIZE;
	await new Promise((r) => setTimeout(r, 500)); // giả lập network
	return { items: filtered.slice(start, end), hasMore: end < filtered.length };
}

export type InfiniteSelectState = Omit<TextInputProps, "value" | "onChange"> & {
	value?: string | null;
	// setValue?: Dispatch<SetStateAction<string | null | undefined>>;
	onChange?: (value: string | null | undefined) => void;
};

const InfiniteSelect: FC<InfiniteSelectState> = (props) => {
	const { value, onChange, ...rest } = props;

	const combobox = useCombobox({ onDropdownClose: () => setSearch("") });

	const [search, setSearch] = useState(value ?? "");
	const [debouncedSearch] = useDebouncedValue(search, 300);

	const [page, setPage] = useState(0);
	const [data, setData] = useState<Item[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const viewportRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let ignore = false;
		(async () => {
			setLoading(true);
			const res = await fetchOptions(debouncedSearch, page);
			if (ignore) return;
			setData((prev) => (page === 0 ? res.items : [...prev, ...res.items]));
			setHasMore(res.hasMore);
			setLoading(false);
		})();
		return () => {
			ignore = true;
		};
	}, [debouncedSearch, page]);

	useEffect(() => {
		setPage(0);
	}, [debouncedSearch]);

	const handleScroll = () => {
		const el = viewportRef.current;
		if (!el || loading || !hasMore) return;
		const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
		if (distanceToBottom < 40) {
			setPage((p) => p + 1);
		}
	};

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => {
				console.log({ val });
				setSearch(val);
				onChange?.(val);
				combobox.closeDropdown();
			}}
			// withinPortal
		>
			<Combobox.Target>
				<TextInput
					rightSection={loading ? <Loader size="xs" /> : null}
					rightSectionPointerEvents="none"
					value={search}
					onClick={() => combobox.openDropdown()}
					onFocus={() => combobox.openDropdown()}
					onBlur={() => {
						combobox.closeDropdown();
						setSearch(value?.toString() || "");
					}}
					placeholder="Search value"
					onChange={(event) => {
						combobox.updateSelectedOptionIndex();
						setSearch(event.currentTarget.value);
					}}
					{...rest}
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<ScrollArea.Autosize
					mah={rem(240)}
					viewportRef={viewportRef}
					onScrollPositionChange={handleScroll}
				>
					<Combobox.Options>
						{data.map((item) => (
							<Combobox.Option key={item.value} value={item.value}>
								{item.label}
							</Combobox.Option>
						))}

						{!loading && data.length === 0 && (
							<Combobox.Empty>Not found</Combobox.Empty>
						)}

						{loading && (
							<Combobox.Empty>
								<Loader size="xs" style={{ marginRight: 8 }} /> Loading…
							</Combobox.Empty>
						)}
					</Combobox.Options>
				</ScrollArea.Autosize>
			</Combobox.Dropdown>
		</Combobox>
	);
};

export default InfiniteSelect;
