import { useState, type FC, type HTMLAttributes } from "react";
import companies from "./data.json";
import MainTable from "@/components/data-display/MainTable/MainTable";
import { COLUMNS } from "./FormLocker.columns";

const FormLocker = () => {
	const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

	return (
		<MainTable
			columns={COLUMNS}
			records={companies}
			selectedRecords={selectedRecords}
			onSelectedRecordsChange={setSelectedRecords}
			onRowClick={() => {}}
		/>
	);
};

export default FormLocker;
