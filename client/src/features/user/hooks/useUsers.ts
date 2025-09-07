import type { User } from "@/generate-api";
import { userApi } from "@/lib/apiClient";
import { wrapPromise } from "@/utils/promise.utils";
import { useState } from "react";

export const useUsers = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<User[]>([]);

	const getAll = async () => {
		setLoading(true);

		const items = await wrapPromise(() => userApi.apiUsersGet());

		setData(items ?? []);

		setLoading(false);
	};

	return {
		loading,
		data,
		getAll,
	};
};
