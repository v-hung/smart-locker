import type { Locker } from "@/generate-api";
import { ActionIcon, Box, Button, Group, Menu } from "@mantine/core";
import { IconDots, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import type { DataTableColumn } from "mantine-datatable";
import { format } from "date-fns";

export const COLUMNS: DataTableColumn<Locker>[] = [
	{ accessor: "id" },
	{ accessor: "lockerCode", sortable: true },
	{ accessor: "location" },
	{ accessor: "status" },
	{
		accessor: "createdAt",
		render: ({ createdAt }) => format(new Date(createdAt!), "dd/MM/yyyy"),
	},
	{
		accessor: "actions",
		title: "",
		textAlign: "right",
		width: "5rem",
		render: (company) => (
			<Menu width={150} position="top-end">
				<Menu.Target>
					<ActionIcon variant="subtle" onClick={(e) => e.stopPropagation()}>
						<IconDots />
					</ActionIcon>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Item leftSection={<IconEdit size={14} />} color="dark">
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
