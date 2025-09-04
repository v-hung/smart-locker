export function enumToSelectOptions<T extends Record<string, string | number>>(
	enumObj: T,
) {
	return Object.entries(enumObj).map(([key, value]) => ({
		value: value as T[keyof T],
		label: key,
	}));
}
