import { forwardRef, useEffect } from "react";
import MainTable from "@/components/data-display/MainTable/MainTable";
import { COLUMNS } from "./LockerTable.columns";
import { useLockerContext } from "../contexts/LockerContext";
import { useNavigate } from "react-router";

const LockerTable = forwardRef((props, ref) => {
	const { selectedRecords, setSelectedRecords } = useLockerContext();
	const navigate = useNavigate();

	const { loading, data, getAll } = useLockerContext();

	useEffect(() => {
		getAll();
	}, []);

	return (
		<MainTable
			selectedRecords={selectedRecords}
			onSelectedRecordsChange={setSelectedRecords}
			onRowClick={({ record }) => navigate(`/lockers/${record.id}/edit`)}
			columns={COLUMNS}
			records={data}
			fetching={loading}
		/>
	);
});

export default LockerTable;
