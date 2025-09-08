import {
	LockerStatusEnum,
	type Locker,
	type LockerWithRelations,
} from "@/generate-api";
import { Button, Grid, Select, Tabs, TextInput } from "@mantine/core";
import { IconListDetails } from "@tabler/icons-react";
import { useState, type FC, type FormEvent } from "react";
import { useForm } from "@mantine/form";
import { enumToSelectOptions } from "@/utils/enum.utils";
import UserSelect from "@/features/user/components/UserSelect";

type LockerFormState = {
	data?: LockerWithRelations | null;
};

const LockerForm: FC<LockerFormState> = (props) => {
	const { data } = props;

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			lockerCode: data?.lockerCode ?? "",
			location: data?.location ?? "",
			status: data?.status ?? "",
			userId: data?.userId ?? "",
		},
	});

	const [first, setFirst] = useState({});

	const handleSubmit = form.onSubmit((values) => {
		setFirst(values);
		console.log({ values });
	});

	return (
		<form onSubmit={handleSubmit}>
			<Tabs defaultValue="form">
				<Tabs.List>
					<Tabs.Tab value="form" leftSection={<IconListDetails size={12} />}>
						Form
					</Tabs.Tab>
				</Tabs.List>

				<div className="paper" style={{ marginTop: "2rem" }}>
					<Tabs.Panel value="form">
						<pre>{JSON.stringify(first)}</pre>
						<Grid>
							<Grid.Col span={6}>
								<TextInput
									label="Locker code"
									key={form.key("lockerCode")}
									{...form.getInputProps("lockerCode")}
								/>
							</Grid.Col>
							<Grid.Col span={12}>
								<TextInput label="Location" />
							</Grid.Col>
							<Grid.Col span={6}>
								<Select
									label="Status"
									placeholder="Pick value"
									data={enumToSelectOptions(LockerStatusEnum)}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<UserSelect
									label="User"
									key={form.key("userId")}
									{...form.getInputProps("userId")}
								/>
							</Grid.Col>
						</Grid>
					</Tabs.Panel>

					<Button type="submit" style={{ marginTop: "2rem" }}>
						Submit
					</Button>
				</div>
			</Tabs>
		</form>
	);
};

export default LockerForm;
