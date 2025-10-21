import type {
	Branch,
	BranchInsertInput,
	BranchUpdateInput,
	PaginatedBranch,
	PaginationQueryInput,
} from "@/generate-api";
import { branchApi } from "@/lib/apiClient";
import { getMessageError, minDelay } from "@/utils/promise.utils";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useBranches = () => {
	const [loading, setLoading] = useState(false);
	const [dataPaginated, setDataPaginated] = useState<PaginatedBranch>({
		data: [],
		meta: {
			page: 1,
			pageSize: 15,
			total: 1,
			totalPages: 1,
		},
	});
	const [selectedRecords, setSelectedRecords] = useState<Branch[]>([]);

	const search = async (
		request: PaginationQueryInput = { page: 1, pageSize: 20 },
	) => {
		try {
			if (loading) return;

			setLoading(true);

			const data = await minDelay(branchApi.apiBranchesSearchPost({ paginationQueryInput: request }))

			if (data) {
				setDataPaginated(data);
			}
		} catch (error) {
			const message = await getMessageError(error);

			notifications.show({
				color: "red",
				title: "Error",
				message: message,
			});
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const create = async (values: BranchInsertInput) => {
		try {
			if (loading) return;

			setLoading(true);

			await branchApi.apiBranchesPost({ branchInsertInput: values });

			notifications.show({
				color: "green",
				title: "Success",
				message: "Your request has been processed successfully.",
			});
		} catch (error) {
			const message = await getMessageError(error);

			notifications.show({
				color: "red",
				title: "Error",
				message: message,
			});
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const update = async (id: string, values: BranchUpdateInput) => {
		try {
			if (loading) return;

			setLoading(true);

			await branchApi.apiBranchesIdPut({ id: id, branchUpdateInput: values });

			notifications.show({
				color: "green",
				title: "Success",
				message: "Your request has been processed successfully.",
			});
		} catch (error) {
			const message = await getMessageError(error);

			notifications.show({
				color: "red",
				title: "Error",
				message: message,
			});
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// DELETE
	const [deleteIds, setDeleteIds] = useState<number[]>([]);
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

	const destroy = async (ids: number[]) => {
		try {
			if (loading) return;

			setLoading(true);

			await branchApi.apiBranchesDeleteDelete({
				apiBranchesDeleteDeleteRequest: { ids },
			});

			notifications.show({
				color: "green",
				title: "Success",
				message: "Your request has been processed successfully.",
			});
		} catch (error) {
			const message = await getMessageError(error);

			notifications.show({
				color: "red",
				title: "Error",
				message: message,
			});
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		dataPaginated,
		search,
		selectedRecords,
		setSelectedRecords,
		create,
		update,
		deleteIds,
		setDeleteIds,
		isOpenDeleteModal,
		setIsOpenDeleteModal,
		destroy,
	};
};
