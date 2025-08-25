import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
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
import { wrapAuthLoader } from "@/utils/loader.utils";
import { redirect, useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "@/stores/auth.store";

export const loader = wrapAuthLoader(async ({ request }, user) => {
	if (user) {
		const redirectUrl =
			new URL(request.url).searchParams.get("redirectUrl") || "/";
		throw redirect(redirectUrl);
	}
});

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
	const auth = useAuthStore();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);

		const { email, password } = Object.fromEntries(
			new FormData(e.currentTarget).entries(),
		) as any;

		const { data, error } = await auth.login(email, password);

		if (error) {
			setLoading(false);
			notifications.show({
				color: "red",
				title: "Login failed",
				message: "Invalid email or password, please try again!",
			});

			trigFail.fire();
			return;
		}

		trigSuccess.fire();

		notifications.show({
			title: "Login successful",
			message: "Welcome back 🚀",
		});

		setTimeout(() => {
			const params = new URLSearchParams(location.search);
			const redirectUrl = params.get("redirectUrl") || "/";

			navigate(redirectUrl);
		}, 800);
	};

	return (
		<div className={styles["page-wrapper"]}>
			<div className={styles["rive-wrapper"]}>
				{/* https://www.youtube.com/watch?v=WQac2jSWTTY */}
				<RiveComponent />
			</div>

			<form onSubmit={handleSubmit} className={styles["form-container"]}>
				<TextInput
					label="Email"
					placeholder="Email"
					name="email"
					value={userValue}
					onChange={onUsernameChange}
					onFocus={onUsernameFocus}
					onBlur={() => (isChecking.value = false)}
					disabled={loading}
					required
				/>

				<PasswordInput
					label="Password"
					name="password"
					placeholder="Password"
					onFocus={() => (isHandsUp.value = true)}
					onBlur={() => (isHandsUp.value = false)}
					disabled={loading}
					required
				/>
				<Button type="submit" loading={loading}>
					Submit
				</Button>
			</form>
		</div>
	);
}
