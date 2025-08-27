import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Anchor, Breadcrumbs, Grid } from "@mantine/core";
import "./HomePage.css";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";

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
				<Grid>
					<Grid.Col span={{ base: 12, md: 6, xl: 4 }}>
						<Grid>
							<Grid.Col span={6}>
								<div className="stats-card"></div>
							</Grid.Col>
							<Grid.Col span={6}>
								<div className="stats-card">1</div>
							</Grid.Col>
							<Grid.Col span={6}>
								<div className="stats-card">1</div>
							</Grid.Col>
							<Grid.Col span={6}>
								<div className="stats-card">1</div>
							</Grid.Col>
						</Grid>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6, xl: 8 }}>
						<div className="map">1</div>
					</Grid.Col>
				</Grid>
			</MainBody>
		</MainContent>
	);
}
