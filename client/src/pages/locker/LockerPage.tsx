import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Button } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import LockerTable from "@/features/locker/components/LockerTable";
import { IconCirclePlusFilled, IconTrash } from "@tabler/icons-react";
import {
	LockerProvider,
	useLockerContext,
} from "@/features/locker/contexts/LockerContext";
import { Link } from "react-router";

export const loader = wrapProtectedLoader();

export function Component() {
	const { data, selectedRecords } = useLockerContext();

	return (
		<MainContent hFull>
			<MainHeader
				title="Lockers"
				subTitle={`${data.length} items`}
				description="Track, manage, and optimize your lockers"
				rightSection={
					<>
						{selectedRecords.length > 0 ? (
							<Button
								variant="light"
								color="red"
								leftSection={<IconTrash size={24} />}
							>
								Delete
							</Button>
						) : null}
						<Button
							variant="light"
							leftSection={<IconCirclePlusFilled size={24} />}
							component={Link}
							to="/lockers/create"
						>
							Add new item
						</Button>
					</>
				}
				breadcrumbs={[{ label: "Lockers", path: "/lockers" }]}
			/>

			<MainBody grow>
				<LockerTable />
			</MainBody>
		</MainContent>
	);
}
