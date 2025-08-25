import {
	createTheme,
	MantineProvider,
	type MantineColorsTuple,
} from "@mantine/core";
import { Outlet } from "react-router";
import { Notifications } from "@mantine/notifications";

// Mantine styles
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// Your global css
import "./App.css";

const myColor: MantineColorsTuple = [
	"#effbf6",
	"#dff3ec",
	"#bae7d6",
	"#92dcbf",
	"#71d1ab",
	"#5dcb9f",
	"#51c898",
	"#42b184",
	"#379d74",
	"#0e3325",
];

const theme = createTheme({
	colors: {
		myColor,
	},
	primaryColor: "myColor",
});

function App() {
	return (
		<MantineProvider theme={theme}>
			<Notifications position="top-right" />
			<Outlet />
		</MantineProvider>
	);
}

export default App;
