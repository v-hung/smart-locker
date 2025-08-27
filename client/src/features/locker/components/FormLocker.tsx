import type { FC, HTMLAttributes } from "react";
import { DataTable } from "mantine-datatable";
import companies from "./data.json";

type State = HTMLAttributes<HTMLDivElement>;

const FormLocker: FC<State> = (props) => {
	const { className = "", ...rest } = props;
	return (
		<div {...rest} className={`${className}`}>
			<DataTable
				columns={[
					{ accessor: "name" },
					{ accessor: "streetAddress" },
					{ accessor: "city" },
					{ accessor: "state" },
				]}
				records={companies}
			/>
		</div>
	);
};

export default FormLocker;
