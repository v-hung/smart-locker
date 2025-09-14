import {
	AuthApi,
	BranchApi,
	Configuration,
	LockerApi,
	UserApi,
} from "@/generate-api";
import { useAuthStore } from "@/stores/auth.store";

export const config = new Configuration({
	basePath: "",
	accessToken(name, scopes): string {
		return useAuthStore.getState().token ?? "";
	},
});

const authApi = new AuthApi(config);
const userApi = new UserApi(config);
const lockerApi = new LockerApi(config);
const branchApi = new BranchApi(config);

export { authApi, userApi, lockerApi, branchApi };
