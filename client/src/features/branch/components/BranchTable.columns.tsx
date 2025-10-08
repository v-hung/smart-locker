import type { Branch } from "@/generate-api";
import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import type { DataTableColumn } from "mantine-datatable";
import { format } from "date-fns";
import { Link } from "react-router";
import { useBranchContext } from "../contexts/BranchContext";
import type React from "react";

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
					<DeleteItem id={id} />
				</Menu.Dropdown>
			</Menu>
		),
	},
];

const DeleteItem = ({ id }: { id: number }) => {
	const { setIsOpenDeleteModal, setDeleteIds } = useBranchContext();

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		setDeleteIds([id]);
		setIsOpenDeleteModal(true);
	};

	return (
		<Menu.Item
			leftSection={<IconTrash size={14} />}
			color="red"
			onClick={handleClick}
		>
			Delete
		</Menu.Item>
	);
};
