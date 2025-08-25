import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

type State = {
	session: Session | null;
	init: boolean;
	load: () => Promise<Session | null>;
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
		return supabase.auth.signInWithPassword({ email, password });
	},

	logout: async () => {
		const { error } = await supabase.auth.signOut();
	},
}));
