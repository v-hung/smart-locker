import type { Branch } from "@/generate-api";
import { branchApi } from "@/lib/apiClient";
import { wrapPromise } from "@/utils/promise.utils";
import { useState } from "react";

export const useBranches = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Branch[]>([]);
	const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

	const getAll = async () => {
		setLoading(true);

		const items = await wrapPromise(() => branchApi.apiBranchesGet());

		setData(items ?? []);

		setLoading(false);
	};

	return {
		loading,
		data,
		getAll,
		selectedRecords,
		setSelectedRecords,
	};
};
