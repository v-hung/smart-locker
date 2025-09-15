import { type Branch, type BranchWithRelations } from "@/generate-api";
import {
	Button,
	Grid,
	LoadingOverlay,
	Select,
	Tabs,
	TextInput,
	Tree,
} from "@mantine/core";
import { IconListDetails } from "@tabler/icons-react";
import {
	forwardRef,
	useImperativeHandle,
	useState,
	type FC,
	type FormEvent,
	type ForwardRefRenderFunction,
} from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { enumToSelectOptions } from "@/utils/enum.utils";
import UserSelect from "@/features/user/components/UserSelect";

type BranchFormState = {
	data?: BranchWithRelations | null;
};

export type BranchFormRef = {
	submit: () => void;
};

const BranchForm: ForwardRefRenderFunction<BranchFormRef, BranchFormState> = (
	props,
	ref,
) => {
	const { data } = props;

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: data?.name ?? "",
			address: data?.address ?? "",
			location: data?.location,
		},
	});

	const handleSubmit = form.onSubmit((values) => {
		console.log({ values });
	});

	useImperativeHandle(ref, () => ({
		submit: () => handleSubmit(),
	}));

	return (
		<form onSubmit={handleSubmit} style={{ position: "relative" }}>
			<LoadingOverlay
				visible={true}
				zIndex={1000}
				overlayProps={{ radius: "sm", blur: 2 }}
			/>
			<Tabs defaultValue="form">
				<Tabs.List>
					<Tabs.Tab value="form" leftSection={<IconListDetails size={12} />}>
						Form
					</Tabs.Tab>
				</Tabs.List>

				<div className="paper" style={{ marginTop: "2rem" }}>
					<Tabs.Panel value="form">
						<Grid>
							<Grid.Col span={6}>
								<TextInput
									label="Name"
									required
									key={form.key("name")}
									{...form.getInputProps("name")}
								/>
							</Grid.Col>
							<Grid.Col span={12}>
								<TextInput
									label="Address"
									required
									key={form.key("address")}
									{...form.getInputProps("address")}
								/>
							</Grid.Col>
							<Grid.Col span={12}>
								<Select label="Location" placeholder="Pick value" required />
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

export default forwardRef(BranchForm);
