import { AuthApi, Configuration } from "@/generate-api";
import { useAuthStore } from "@/stores/auth.store";

export const config = new Configuration({
	basePath: "",
	accessToken(name, scopes): string {
		return useAuthStore.getState().token ?? "";
	},
});

const authApi = new AuthApi(config);

export { authApi };
