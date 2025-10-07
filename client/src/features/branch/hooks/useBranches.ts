import type { Branch, BranchInsertInput } from "@/generate-api";
import { branchApi } from "@/lib/apiClient";
import { wrapPromise } from "@/utils/promise.utils";
import { useState } from "react";

export const useBranches = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Branch[]>([]);
	const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

	const search = async () => {
		setLoading(true);

		const items = await wrapPromise(() => branchApi.apiBranchesGet());

		setData(items ?? []);

		setLoading(false);
	};

	const create = async (values: BranchInsertInput) => {
		try {
			if (loading) return;

			setLoading(true);

			await wrapPromise(() =>
				branchApi.apiBranchesPost({ branchInsertInput: values }),
			);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		data,
		search,
		selectedRecords,
		setSelectedRecords,
		create,
	};
};
