import { Paper, Tabs } from "@mantine/core";
import { IconListDetails } from "@tabler/icons-react";

const FormLocker = () => {
	return (
		<Tabs defaultValue="form">
			<Tabs.List>
				<Tabs.Tab value="form" leftSection={<IconListDetails size={12} />}>
					Form
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="form" style={{ marginTop: "2rem" }}>
				<div className="paper">a</div>
			</Tabs.Panel>
		</Tabs>
	);
};

export default FormLocker;
