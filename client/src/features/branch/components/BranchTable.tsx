import { forwardRef, useEffect } from "react";
import MainTable from "@/components/data-display/MainTable/MainTable";
import { COLUMNS } from "./BranchTable.columns";
import { useBranchContext } from "../contexts/BranchContext";
import { useNavigate } from "react-router";

const BranchTable = forwardRef((props, ref) => {
	const { selectedRecords, setSelectedRecords } = useBranchContext();
	const navigate = useNavigate();

	const { loading, data, search } = useBranchContext();

	useEffect(() => {
		search();
	}, []);

	return (
		<MainTable
			selectedRecords={selectedRecords}
			onSelectedRecordsChange={setSelectedRecords}
			onRowClick={({ record }) => navigate(`/branches/${record.id}/edit`)}
			columns={COLUMNS}
			records={data}
			fetching={loading}
		/>
	);
});

export default BranchTable;
