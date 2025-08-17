import {
	createTheme,
	MantineProvider,
	type MantineColorsTuple,
} from "@mantine/core";
import { Outlet } from "react-router";
import "@mantine/core/styles.css";
import "./App.css";

const myColor: MantineColorsTuple = [
	"#ecf4ff",
	"#dce4f5",
	"#b9c7e2",
	"#94a8d0",
	"#748dc0",
	"#5f7cb7",
	"#5474b4",
	"#44639f",
	"#3a5890",
	"#2c4b80",
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
			<Outlet />
		</MantineProvider>
	);
}

export default App;
