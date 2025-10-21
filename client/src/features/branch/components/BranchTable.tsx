import { forwardRef, useEffect } from "react";
import MainTable from "@/components/data-display/MainTable/MainTable";
import { COLUMNS } from "./BranchTable.columns";
import { useBranchContext } from "../contexts/BranchContext";
import { useNavigate } from "react-router";

const PAGE_SIZES = [10, 20, 40, 60];

const BranchTable = forwardRef((props, ref) => {
	const { selectedRecords, setSelectedRecords } = useBranchContext();
	const navigate = useNavigate();

	const { loading, dataPaginated, search } = useBranchContext();

	useEffect(() => {
		search();
	}, []);

	const handelChangePage = ({
		page,
		pageSize,
	}: {
		page?: number;
		pageSize?: number;
	}) => {
		const request = {
			page: pageSize ? 1 : (page ?? dataPaginated.meta.page),
			pageSize: pageSize ?? dataPaginated.meta.pageSize,
		};

		search(request);
	};

	return (
		<MainTable
			selectedRecords={selectedRecords}
			onSelectedRecordsChange={setSelectedRecords}
			onRowClick={({ record }) => navigate(`/branches/${record.id}/edit`)}
			columns={COLUMNS}
			records={dataPaginated.data}
			totalRecords={dataPaginated.meta.total}
			recordsPerPage={dataPaginated.meta.pageSize}
			page={dataPaginated.meta.page}
			onPageChange={(p) => handelChangePage({ page: p })}
			recordsPerPageOptions={PAGE_SIZES}
			onRecordsPerPageChange={(pp) => handelChangePage({ pageSize: pp })}
			fetching={loading}
		/>
	);
});

export default BranchTable;
