import { useEffect, type FC } from "react";
import { nprogress, NavigationProgress } from "@mantine/nprogress";
import { useNavigation } from "react-router";
import '@mantine/nprogress/styles.css';

export type ProgressIndicatorState = {};

const ProgressIndicator: FC<ProgressIndicatorState> = (props) => {
	const { } = props;

	const { state } = useNavigation();

	useEffect(() => {
		if (state === "loading") {
			nprogress.start();
		} else {
			nprogress.complete();
		}
	}, [state]);

	return <NavigationProgress />;
};

export default ProgressIndicator;
