import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Button } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import LockerTable from "@/features/locker/components/LockerTable";
import { IconCirclePlusFilled, IconTrash } from "@tabler/icons-react";
import {
	LockersProvider,
	useLockersContext,
} from "@/features/locker/contexts/LockerContext";

export const loader = wrapProtectedLoader();

export function Component() {
	return (
		<MainContent hFull>
			<LockersProvider>
				<Header />

				<MainBody grow>
					<LockerTable />
				</MainBody>
			</LockersProvider>
		</MainContent>
	);
}

const Header = () => {
	const { data, selectedRecords } = useLockersContext();

	return (
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
					>
						Add new item
					</Button>
				</>
			}
			breadcrumbs={[{ label: "Lockers", path: "/lockers" }]}
		/>
	);
};
