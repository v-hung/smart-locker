import { ActionIcon, Box, Button, Group, Menu } from "@mantine/core";
import { IconDots, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import type { DataTableColumn } from "mantine-datatable";

export const COLUMNS: DataTableColumn<any>[] = [
	{ accessor: "name", render: ({ city }) => city.toLocaleUpperCase() },
	{ accessor: "streetAddress", sortable: true },
	{ accessor: "city" },
	{ accessor: "state" },
	{
		accessor: "actions",
		title: "",
		textAlign: "right",
		width: "5rem",
		render: (company) => (
			// <Group gap={4} justify="right" wrap="nowrap">
			// 	<ActionIcon size="sm" variant="subtle" color="green">
			// 		<IconEye size={16} />
			// 	</ActionIcon>
			// 	<ActionIcon size="sm" variant="subtle" color="blue">
			// 		<IconEdit size={16} />
			// 	</ActionIcon>
			// 	<ActionIcon size="sm" variant="subtle" color="red">
			// 		<IconTrash size={16} />
			// 	</ActionIcon>
			// </Group>
			<Menu width={150} position="top-end" withinPortal>
				<Menu.Target>
					<ActionIcon variant="subtle">
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
