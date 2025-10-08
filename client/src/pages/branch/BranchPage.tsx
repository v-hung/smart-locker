import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Button } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import BranchTable from "@/features/branch/components/BranchTable";
import { IconCirclePlusFilled, IconTrash } from "@tabler/icons-react";
import {
	BranchProvider,
	useBranchContext,
} from "@/features/branch/contexts/BranchContext";
import { Link } from "react-router";

export const loader = wrapProtectedLoader();

export function Component() {
	const { dataPaginated, selectedRecords, setDeleteIds, setIsOpenDeleteModal } =
		useBranchContext();

	return (
		<MainContent hFull>
			<MainHeader
				title="Branches"
				subTitle={`${dataPaginated.data.length} items`}
				description="Track, manage, and optimize your branches"
				rightSection={
					<>
						{selectedRecords.length > 0 ? (
							<Button
								variant="light"
								color="red"
								leftSection={<IconTrash size={24} />}
								onClick={() => {
									setDeleteIds(selectedRecords.map((v) => v.id));
									setIsOpenDeleteModal(true);
								}}
							>
								Delete
							</Button>
						) : null}
						<Button
							variant="light"
							leftSection={<IconCirclePlusFilled size={24} />}
							component={Link}
							to="/branches/create"
						>
							Add new item
						</Button>
					</>
				}
				breadcrumbs={[{ label: "Branches", path: "/branches" }]}
			/>

			<MainBody grow>
				<BranchTable />
			</MainBody>
		</MainContent>
	);
}
