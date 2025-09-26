import { Input } from "@mantine/core";
import type { ComponentProps, FC, HTMLAttributes } from "react";

export type MapPickerState = ComponentProps<typeof Input.Wrapper>;

const MapPicker: FC<MapPickerState> = (props) => {
	const { className = "", ...rest } = props;

	return (
		<Input.Wrapper {...rest} className={`${className}`}>
			<Input />
		</Input.Wrapper>
	);
};

export default MapPicker;
