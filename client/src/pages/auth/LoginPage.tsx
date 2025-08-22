import { Button, Input, PasswordInput } from "@mantine/core";
import styles from "./LoginPage.module.css";
import { useRive } from "@rive-app/react-canvas";

// https://rive.app/marketplace/2244-7248-animated-login-character/

export function Component() {
	const { rive, RiveComponent } = useRive({
		src: "/animated_login_character.riv",
		stateMachines: "idle",
		autoplay: true,
	});

	return (
		<div className={styles["page-wrapper"]}>
			<div className={styles["rive-wrapper"]}>
				<RiveComponent />
			</div>

			<div className={styles["form-container"]}>
				<Input.Wrapper label="Email">
					<Input placeholder="Email" />
				</Input.Wrapper>
				<PasswordInput label="Password" placeholder="Password" />
				<Button>Submit</Button>
			</div>
		</div>
	);
}
