import { create } from "zustand";
import { getMessageError, sleep, wrapPromise } from "@/utils/promise.utils";
import { AuthApi, Configuration, type User } from "@/generate-api";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

const baseAuthApi = new AuthApi(
	new Configuration({
		basePath: "",
	}),
);

type State = {
	user: User | null;
	token: string | null;
	init: boolean;
	load: () => Promise<User | null>;
	login: (
		email: string,
		password: string,
	) => Promise<[User | null, string | null]>;
	logout: () => void;
};

export const useAuthStore = create<State>()(
	persist(
		immer((set, get) => ({
			user: null,
			token: null,
			init: false,

			load: async () => {
				if (get().init) return get().user;

				const { authApi } = await import("@/lib/apiClient");

				let user = await wrapPromise(() => authApi.apiAuthLoadGet());

				set({ user, init: true });

				return user;
			},

			login: async (email, password) => {
				try {
					const [{ user, token }] = await Promise.all([
						baseAuthApi.apiAuthLoginPost({
							loginBodyInput: { email, password },
						}),
						sleep(1000),
					]);

					set({ user, token });

					return [user, null];
				} catch (error) {
					return [null, await getMessageError(error)];
				}
			},

			logout: async () => {
				set({ user: null, token: null });
			},
		})),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ user: state.user, token: state.token }),
		},
	),
);
