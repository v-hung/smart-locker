import { redirect, type LoaderFunction } from "react-router";
import { useAuthStore } from "@/stores/auth.store";
import type { Session, User } from "@supabase/supabase-js";

export function wrapProtectedLoader<T extends LoaderFunction>(
	originalLoader?: (args: Parameters<T>[0], user: User) => ReturnType<T>,
): T {
	return (async (...args) => {
		const authData = await useAuthStore.getState().load();
		const { request } = args[0];

		if (!authData) {
			const redirectUrl =
				request.url != "/auth/login"
					? "?redirectUrl=" + encodeURIComponent(new URL(request.url).pathname)
					: "";
			throw redirect(`/auth/login${redirectUrl}`);
		}

		return originalLoader
			? originalLoader(args[0], authData.user || null)
			: null;
	}) as T;
}

export function wrapAuthLoader<T extends LoaderFunction>(
	originalLoader?: (args: Parameters<T>[0], user: User | null) => ReturnType<T>,
): T {
	return (async (...args) => {
		const authData = await useAuthStore.getState().load();
		return originalLoader
			? originalLoader(args[0], authData?.user || null)
			: null;
	}) as T;
}
