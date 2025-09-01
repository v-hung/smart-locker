import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Anchor, Breadcrumbs, Button, Grid } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import FormLocker from "@/features/locker/components/FormLocker";
import { IconCirclePlusFilled } from "@tabler/icons-react";

export const loader = wrapProtectedLoader();

export function Component() {
	return (
		<MainContent hFull>
			<MainHeader
				title="Lockers"
				subTitle="100 items"
				description="Track, manager, and optimize your campaings"
				rightSection={
					<Button
						variant="light"
						leftSection={<IconCirclePlusFilled size={24} />}
					>
						Add new item
					</Button>
				}
			/>

			<MainBody grow>
				<FormLocker />
			</MainBody>
		</MainContent>
	);
}
