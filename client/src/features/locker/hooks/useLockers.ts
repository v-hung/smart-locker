import type { Locker } from "@/generate-api";
import { lockerApi } from "@/lib/apiClient";
import { wrapPromise } from "@/utils/promise.utils";
import { useState } from "react";

export const useLockers = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Locker[]>([]);

	const getAll = async () => {
		setLoading(true);

		const items = await wrapPromise(() => lockerApi.apiLockersLockersGet());

		setData(items ?? []);

		setLoading(false);
	};

	return {
		loading,
		data,
		getAll,
	};
};
