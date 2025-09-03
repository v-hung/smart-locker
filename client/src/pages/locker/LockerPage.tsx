import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Anchor, Breadcrumbs, Button, Grid } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import TableLocker from "@/features/locker/components/TableLocker";
import { IconCirclePlusFilled } from "@tabler/icons-react";
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
					<TableLocker />
				</MainBody>
			</LockersProvider>
		</MainContent>
	);
}

const Header = () => {
	const { data } = useLockersContext();
	return (
		<MainHeader
			title="Lockers"
			subTitle={`${data.length} items`}
			description="Track, manage, and optimize your lockers"
			rightSection={
				<Button
					variant="light"
					leftSection={<IconCirclePlusFilled size={24} />}
				>
					Add new item
				</Button>
			}
			breadcrumbs={[{ label: "Lockers", path: "/lockers" }]}
		/>
	);
};
