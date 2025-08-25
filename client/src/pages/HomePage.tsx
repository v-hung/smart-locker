import { wrapProtectedLoader } from "@/utils/loader.utils";

export const loader = wrapProtectedLoader();

export function Component() {
	return "home";
}
