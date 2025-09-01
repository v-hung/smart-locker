import { DataTable, type DataTableProps } from "mantine-datatable";
import type { ComponentProps } from "react";
import { IconChevronUp, IconSelector } from "@tabler/icons-react";

import styles from "./MainTable.module.css";

// type State<T> = ComponentProps<typeof DataTable<T>>;

const MainTable = <T,>(props: DataTableProps<T>) => {
	const { className = "", ...rest } = props;
	return (
		<DataTable
			withTableBorder
			borderRadius="md"
			striped
			highlightOnHover
			minHeight={150}
			sortIcons={{
				sorted: <IconChevronUp size={14} />,
				unsorted: <IconSelector size={14} />,
			}}
			{...loaderCustom}
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
