import type {
	PaginatedUser,
	PaginatedUserInput,
	PaginationQuery,
	User,
} from "@/generate-api";
import { userApi } from "@/lib/apiClient";
import { wrapPromise } from "@/utils/promise.utils";
import { useCallback, useState } from "react";

export const useUsers = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<User[]>([]);

	const getAll = async () => {
		setLoading(true);

		const items = await wrapPromise(() => userApi.apiUsersGet());

		setData(items ?? []);

		setLoading(false);
	};

	// search
	const [paginationInput, setPaginationInput] = useState<PaginationQuery>({
		p: "",
		page: 1,
		pageSize: 20,
	});

	const [paginatedData, setPaginatedData] = useState<PaginatedUser>({
		data: [],
		meta: {
			page: 1,
			pageSize: 20,
			total: 1,
			totalPages: 1,
		},
	});

	const search = async (input: PaginationQuery) => {
		setLoading(true);

		const result = await wrapPromise(() =>
			userApi.apiUsersSearchPost({ paginationQueryInput: input }),
		);

		if (result) {
			setPaginatedData(result);
		}

		setLoading(false);
	};

	// get by id
	const [record, setRecord] = useState<User | null>();

	const getById = async (id: string) => {
		setLoading(true);

		const result = await wrapPromise(() => userApi.apiUsersIdGet({ id: id }));

		setLoading(false);

		setRecord(result);
	};

	return {
		loading,
		data,
		getAll,
		paginationInput,
		setPaginationInput,
		paginatedData,
		setPaginatedData,
		search,
		record,
		getById,
	};
};
