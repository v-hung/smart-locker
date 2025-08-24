import { Button, Input, PasswordInput } from "@mantine/core";
import styles from "./LoginPage.module.css";
import {
	Rive,
	StateMachineInput,
	useRive,
	useStateMachineInput,
} from "@rive-app/react-canvas";
import {
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type FocusEvent,
	type FormEvent,
} from "react";

// https://rive.app/marketplace/2244-7248-animated-login-character/

const STATE_MACHINE_LOGIN = "Login Machine";

function useLoginInputs(rive: Rive | null, names: string[]) {
	return names.reduce(
		(acc, name) => {
			acc[name] = useStateMachineInput(
				rive,
				STATE_MACHINE_LOGIN,
				name,
			) as StateMachineInput;
			return acc;
		},
		{} as Record<string, StateMachineInput>,
	);
}

export function Component() {
	const { rive, RiveComponent } = useRive({
		src: "/animated_login_character.riv",
		stateMachines: STATE_MACHINE_LOGIN,
		autoplay: true,
	});

	const [userValue, setUserValue] = useState("");
	const [inputLookMultiplier, setInputLookMultiplier] = useState(2);

	const { isChecking, isHandsUp, trigSuccess, trigFail, numLook } =
		useLoginInputs(rive, [
			"isChecking",
			"isHandsUp",
			"trigSuccess",
			"trigFail",
			"numLook",
		]);

	const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newVal = e.target.value;
		setUserValue(newVal);
		if (!isChecking.value) {
			isChecking.value = true;
		}

		const caretPos = e.target.selectionStart ?? newVal.length;
		numLook.value = caretPos * inputLookMultiplier;
	};

	const onUsernameFocus = (e: FocusEvent<HTMLInputElement>) => {
		isChecking.value = true;
		setTimeout(() => {
			const caretPos = e.target.selectionStart ?? e.target.value.length;
			numLook.value = caretPos * inputLookMultiplier;
		}, 0);
	};

	// HANDLE LOGIN
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		setLoading(true);

		await new Promise((resolve) => setTimeout(resolve, 1500));

		setLoading(false);

		const isSuccess = Math.random() > 0.5;

		if (isSuccess) {
			trigSuccess.fire();
		} else {
			trigFail.fire();
		}
	};

	return (
		<div className={styles["page-wrapper"]}>
			<div className={styles["rive-wrapper"]}>
				<RiveComponent />
			</div>

			<form onSubmit={handleSubmit} className={styles["form-container"]}>
				<Input.Wrapper label="Email">
					<Input
						placeholder="Email"
						value={userValue}
						onChange={onUsernameChange}
						onFocus={onUsernameFocus}
						onBlur={() => (isChecking.value = false)}
						disabled={loading}
					/>
				</Input.Wrapper>
				<PasswordInput
					label="Password"
					placeholder="Password"
					onFocus={() => (isHandsUp.value = true)}
					onBlur={() => (isHandsUp.value = false)}
					disabled={loading}
				/>
				<Button type="submit" loading={loading}>
					Submit
				</Button>
			</form>
		</div>
	);
}
