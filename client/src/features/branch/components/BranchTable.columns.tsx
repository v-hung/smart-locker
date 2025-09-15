import type { Branch } from "@/generate-api";
import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import type { DataTableColumn } from "mantine-datatable";
import { format } from "date-fns";
import { Link } from "react-router";

export const COLUMNS: DataTableColumn<Branch>[] = [
	{ accessor: "id" },
	{ accessor: "name" },
	{ accessor: "addess" },
	{
		accessor: "createdAt",
		render: ({ createdAt }) => format(new Date(createdAt!), "dd/MM/yyyy"),
	},
	{
		accessor: "actions",
		title: "",
		textAlign: "right",
		width: "5rem",
		render: ({ id }) => (
			<Menu width={150} position="top-end">
				<Menu.Target>
					<ActionIcon variant="subtle" onClick={(e) => e.stopPropagation()}>
						<IconDots />
					</ActionIcon>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item
						component={Link}
						to={`/branches/${id}/edit`}
						leftSection={<IconEdit size={14} />}
						color="dark"
					>
						Edit
					</Menu.Item>
					<Menu.Item leftSection={<IconTrash size={14} />} color="red">
						Delete
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		),
	},
];
