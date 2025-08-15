import { createTheme, MantineProvider } from "@mantine/core";
import { Outlet } from "react-router";
import "@mantine/core/styles.css";
import "./App.css";

const theme = createTheme({
	/** Your theme override here */
});

function App() {
	return (
		<MantineProvider theme={theme}>
			<Outlet />
		</MantineProvider>
	);
}

export default App;
