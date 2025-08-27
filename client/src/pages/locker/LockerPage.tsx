import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Anchor, Breadcrumbs, Grid } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import FormLocker from "@/features/locker/components/FormLocker";

export const loader = wrapProtectedLoader();

export function Component() {
	return (
		<MainContent className="home-page">
			<MainHeader title="Dashboard" />

			<MainBody>
				<Breadcrumbs style={{ margin: "0 0 1.5rem" }}>
					<Anchor>item.title</Anchor>
					<Anchor>item.title</Anchor>
					<Anchor>item.title</Anchor>
				</Breadcrumbs>
				<FormLocker />
			</MainBody>
		</MainContent>
	);
}
