import { type BranchWithRelations } from "@/generate-api";
import {
	Button,
	Grid,
	LoadingOverlay,
	Select,
	Tabs,
	TextInput,
} from "@mantine/core";
import { IconListDetails } from "@tabler/icons-react";
import {
	forwardRef,
	useImperativeHandle,
	type ForwardRefRenderFunction,
} from "react";
import { useForm } from "@mantine/form";
import MapPicker from "@/components/inputs/MapPicker/MapPicker";
import { useBranches } from "../hooks/useBranches";
import { useNavigate } from "react-router";

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
	const navigate = useNavigate();

	const { loading, create } = useBranches();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			id: data?.id,
			name: data?.name ?? "",
			address: data?.address ?? "",
			location: data?.location,
		},
	});

	const handleSubmit = form.onSubmit(async (values) => {
		await create(values);
		navigate("/branches");
	});

	useImperativeHandle(ref, () => ({
		submit: () => handleSubmit(),
	}));

	return (
		<form onSubmit={handleSubmit} style={{ position: "relative" }}>
			<LoadingOverlay
				visible={loading}
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
								<MapPicker
									label="Location"
									{...form.getInputProps("location")}
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

export default forwardRef(BranchForm);
