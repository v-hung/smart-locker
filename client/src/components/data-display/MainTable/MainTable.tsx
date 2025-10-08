import { DataTable, type DataTableProps } from "mantine-datatable";
import type { ComponentProps } from "react";
import { IconChevronUp, IconSelector } from "@tabler/icons-react";

import styles from "./MainTable.module.css";

// type State<T> = ComponentProps<typeof DataTable<T>>;

const MainTable = <T,>(props: DataTableProps<T>) => {
	const { className = "", records, ...rest } = props;
	return (
		<DataTable
			withTableBorder
			borderRadius="md"
			striped
			highlightOnHover
			minHeight={records?.length == 0 ? 250 : undefined}
			sortIcons={{
				sorted: <IconChevronUp size={14} />,
				unsorted: <IconSelector size={14} />,
			}}
			{...loaderCustom}
			records={records}
			{...rest}
			classNames={{
				root: `${styles.root} ${className}`,
				table: styles.table,
				header: styles.header,
				footer: styles.footer,
				pagination: styles.pagination,
			}}
		/>
	);
};

export default MainTable;

const loaderCustom = {
	loaderType: "dots",
	loaderBackgroundBlur: 2,
} as any;
