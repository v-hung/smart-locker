import { useEffect, useRef, useState, type FC } from "react";
import {
	Combobox,
	useCombobox,
	TextInput,
	ScrollArea,
	Loader,
	rem,
	type TextInputProps,
} from "@mantine/core";

export type InfiniteSelectItem = {
	label: string;
	value: string;
};

export type InfiniteSelectState<Multiple extends boolean = false> = Omit<
	TextInputProps,
	"value" | "defaultValue" | "onChange"
> & {
	multiple?: Multiple;
	value?: Multiple extends true ? string[] : string | null;
	defaultValue?: Multiple extends true ? string[] : string | null;
	onChange?: Multiple extends true
		? (value: string[]) => void
		: (value: string | null | undefined) => void;
	data?: InfiniteSelectItem[];
	onScroll?: () => void;
	loading?: boolean;
	onSearch?: (k?: string) => void;
	initDropdownOnOpen?: () => void;
};

const InfiniteSelect: FC<InfiniteSelectState> = (props) => {
	const {
		value,
		defaultValue,
		onChange,
		data = [],
		onScroll,
		loading = false,
		onSearch,
		initDropdownOnOpen,
		...rest
	} = props;

	const combobox = useCombobox({
		onDropdownClose: () => {
			setSearch(getLabelInValue(currentValue));
		},
	});
	const viewportRef = useRef<HTMLDivElement | null>(null);

	const hasOpened = useRef(false);
	const [currentValue, setCurrentValue] = useState<string | null>();
	const [search, setSearch] = useState("");

	const handleScroll = () => {
		const el = viewportRef.current;
		if (!el) return;
		const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
		if (distanceToBottom < 40) {
			onScroll?.();
		}
	};

	const handleDropdownOpen = () => {
		combobox.openDropdown();

		if (!hasOpened.current) {
			initDropdownOnOpen?.();
			hasOpened.current = true;
		}
	};

	const getLabelInValue = (value?: string | null) =>
		value ? (data.find((v) => v.value == value)?.label ?? "") : "";

	useEffect(() => {
		let newCurrentValue = value ?? defaultValue;
		let newSearchValue = getLabelInValue(newCurrentValue);

		if (
			newCurrentValue &&
			currentValue != newCurrentValue &&
			newSearchValue != search
		) {
			setCurrentValue(newCurrentValue);
			setSearch(newSearchValue);
		}
	}, [value, defaultValue, data]);

	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(val) => {
				setSearch(getLabelInValue(val));
				onChange?.(val);
				setCurrentValue(val);
				combobox.closeDropdown();
			}}
			withinPortal
		>
			<Combobox.Target>
				<TextInput
					rightSection={loading ? <Loader size="xs" /> : null}
					rightSectionPointerEvents="none"
					value={search}
					onClick={handleDropdownOpen}
					onFocus={handleDropdownOpen}
					onBlur={() => combobox.closeDropdown()}
					placeholder="Search value"
					onChange={(event) => {
						combobox.updateSelectedOptionIndex();
						setSearch(event.currentTarget.value);
						if (onSearch) {
							onSearch(event.currentTarget.value);
						}
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
