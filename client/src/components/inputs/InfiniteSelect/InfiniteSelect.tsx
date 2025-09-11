import { useEffect, useRef, useState } from "react";
import {
	Combobox,
	useCombobox,
	TextInput,
	ScrollArea,
	Loader,
	rem,
	type TextInputProps,
	PillsInput,
	Pill,
	CloseButton,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export type InfiniteSelectItem = {
	label: string;
	value: string;
};

// ==== Props types ====
type InfiniteSelectBase = Omit<
	TextInputProps,
	"value" | "defaultValue" | "onChange"
> & {
	data?: InfiniteSelectItem[];
	onScroll?: () => void;
	loading?: boolean;
	onSearch?: (k?: string) => void;
	initDropdownOnOpen?: () => void;
};

type InfiniteSelectSingle = InfiniteSelectBase & {
	multiple?: false;
	value?: string | null;
	defaultValue?: string | null;
	onChange?: (value: string | null) => void;
};

type InfiniteSelectMultiple = InfiniteSelectBase & {
	multiple: true;
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
};

export type InfiniteSelectProps = InfiniteSelectSingle | InfiniteSelectMultiple;

// ==== Component ====
function InfiniteSelect(props: InfiniteSelectProps) {
	const {
		multiple,
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

	const combobox = useCombobox({ onDropdownClose: () => {} });
	const viewportRef = useRef<HTMLDivElement | null>(null);
	const hasOpened = useRef(false);

	// state
	const [currentValue, setCurrentValue] = useState(
		value ?? defaultValue ?? (multiple ? [] : null),
	);
	const [search, setSearch] = useState("");

	// helpers
	const getLabelInValue = (val?: string | null) =>
		val ? (data.find((v) => v.value === val)?.label ?? "") : "";

	const handleDropdownOpen = () => {
		combobox.openDropdown();
		if (!hasOpened.current) {
			initDropdownOnOpen?.();
			hasOpened.current = true;
		}
	};

	const handleScroll = () => {
		const el = viewportRef.current;
		if (!el) return;
		const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
		if (distanceToBottom < 40) onScroll?.();
	};

	const handleValueRemove = (val: string) => {
		if (multiple) {
			const newValue = (currentValue as string[]).filter((v) => v !== val);
			setCurrentValue(newValue);
			props.onChange?.(newValue);
		}
	};

	// sync value/search when props change
	useEffect(() => {
		const newCurrentValue = value ?? defaultValue;
		const newSearchValue = Array.isArray(newCurrentValue)
			? getLabelInValue(newCurrentValue[0])
			: getLabelInValue(newCurrentValue);

		if (
			newCurrentValue &&
			currentValue !== newCurrentValue &&
			newSearchValue !== search
		) {
			setCurrentValue(newCurrentValue);
			setSearch(newSearchValue);
		}
	}, [value, defaultValue, data]);

	// handlers
	const handleOptionSubmit = (val: string) => {
		if (multiple) {
			const newValue = [...((currentValue as string[]) ?? []), val];
			setCurrentValue(newValue);
			(onChange as (v: string[]) => void)?.(newValue);
			setSearch("");
		} else {
			setCurrentValue(val);
			(onChange as (v: string | null) => void)?.(val);
			setSearch(getLabelInValue(val));
			combobox.closeDropdown();
		}
	};

	return (
		<Combobox store={combobox} onOptionSubmit={handleOptionSubmit} withinPortal>
			{!multiple ? (
				<Combobox.Target>
					<TextInput
						rightSection={
							loading ? (
								<Loader size="xs" />
							) : (
								<CloseButton
									aria-label="Clear input"
									onClick={(e) => {
										e.stopPropagation();
										setCurrentValue(null);
										(onChange as (v: string | null) => void)?.(null);
										setSearch("");
									}}
									style={{ display: search ? undefined : "none" }}
								/>
							)
						}
						rightSectionPointerEvents={loading ? "none" : "all"}
						value={search}
						onClick={handleDropdownOpen}
						onFocus={handleDropdownOpen}
						onBlur={() => {
							setSearch(getLabelInValue(currentValue as string | null));
							combobox.closeDropdown();
						}}
						placeholder="Search value"
						onChange={(event) => {
							setSearch(event.currentTarget.value);
							onSearch?.(event.currentTarget.value);
						}}
						{...rest}
					/>
				</Combobox.Target>
			) : (
				<Combobox.DropdownTarget>
					<PillsInput onClick={() => combobox.openDropdown()}>
						<Pill.Group>
							{(currentValue as string[]).map((item) => (
								<Pill
									key={item}
									withRemoveButton
									onRemove={() => handleValueRemove(item)}
								>
									{item}
								</Pill>
							))}

							<Combobox.EventsTarget>
								<PillsInput.Field
									onFocus={() => combobox.openDropdown()}
									onBlur={() => combobox.closeDropdown()}
									value={search}
									placeholder="Search values"
									onChange={(event) => {
										combobox.updateSelectedOptionIndex();
										setSearch(event.currentTarget.value);
										onSearch?.(event.currentTarget.value);
									}}
									onKeyDown={(event) => {
										if (
											event.key === "Backspace" &&
											search.length === 0 &&
											(currentValue as string[]).length > 0
										) {
											event.preventDefault();
											handleValueRemove(
												(currentValue as string[]).slice(-1)[0],
											);
										}
									}}
								/>
							</Combobox.EventsTarget>
						</Pill.Group>
					</PillsInput>
				</Combobox.DropdownTarget>
			)}

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
}

export default InfiniteSelect;
