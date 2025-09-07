import {
	forwardRef,
	useEffect,
	useState,
	type FC,
	type HTMLAttributes,
} from "react";
import MainTable from "@/components/data-display/MainTable/MainTable";
import { COLUMNS } from "./TableLocker.columns";
import { useLockersContext } from "../contexts/LockerContext";
import { useNavigate } from "react-router";

const TableLocker = forwardRef((props, ref) => {
	const { selectedRecords, setSelectedRecords } = useLockersContext();
	const navigate = useNavigate();

	const { loading, data, getAll } = useLockersContext();

	useEffect(() => {
		getAll();
	}, []);

	return (
		<MainTable
			selectedRecords={selectedRecords}
			onSelectedRecordsChange={setSelectedRecords}
			onRowClick={({ record }) => navigate(`/lockers/${record.id}`)}
			columns={COLUMNS}
			records={data}
			fetching={loading}
		/>
	);
});

export default TableLocker;
