import { redirect } from "react-router";

export function loader() {
	throw redirect(`/auth/login`);
}

export function Component() {
	return "home";
}
