import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import type { AuthTokenResponsePassword, Session } from "@supabase/supabase-js";
import { sleep } from "@/utils/promise.utils";

type State = {
	session: Session | null;
	init: boolean;
	load: () => Promise<Session | null>;
	login: (
		email: string,
		password: string,
	) => Promise<AuthTokenResponsePassword>;
	logout: () => void;
};

export const useAuthStore = create<State>((set, get) => ({
	session: null,
	init: false,

	load: async () => {
		if (get().init) return get().session;

		let { data, error } = await supabase.auth.getSession();

		set({ session: data.session, init: true });

		return data.session;
	},

	login: async (email, password) => {
		const [{ data, error }] = await Promise.all([
			supabase.auth.signInWithPassword({ email, password }),
			sleep(1000),
		]);

		if (!error) {
			set({ session: data.session });
		}

		return { data, error } as AuthTokenResponsePassword;
	},

	logout: async () => {
		const { error } = await supabase.auth.signOut();
	},
}));
