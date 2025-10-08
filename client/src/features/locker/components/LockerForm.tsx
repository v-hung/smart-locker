import {
	LockerLockTypeEnum,
	LockerSizeEnum,
	LockerStatusEnum,
	LockerTypeEnum,
	type Locker,
	type LockerWithRelations,
} from "@/generate-api";
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

type LockerFormState = {
	data?: LockerWithRelations | null;
};

export type LockerFormRef = {
	submit: () => void;
};

const LockerForm: ForwardRefRenderFunction<LockerFormRef, LockerFormState> = (
	props,
	ref,
) => {
	const { data } = props;

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			lockerCode: data?.lockerCode ?? "",
			area: data?.area ?? "",
			size: data?.size ?? LockerSizeEnum.M,
			type: data?.type ?? LockerTypeEnum.Standard,
			lockType: data?.lockType ?? LockerLockTypeEnum.Card,
			status: data?.status ?? LockerStatusEnum.Available,
			userId: data?.userId ?? "",
			branchId: data?.branchId ?? "",
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
				visible={false}
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
									label="Locker code"
									required
									key={form.key("lockerCode")}
									{...form.getInputProps("lockerCode")}
								/>
							</Grid.Col>
							<Grid.Col span={12}>
								<TextInput label="Area" required />
							</Grid.Col>
							<Grid.Col span={6}>
								<Select
									label="Size"
									placeholder="Pick value"
									required
									data={enumToSelectOptions(LockerSizeEnum)}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<Select
									label="Type"
									placeholder="Pick value"
									required
									data={enumToSelectOptions(LockerTypeEnum)}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<Select
									label="Lock Type"
									placeholder="Pick value"
									required
									data={enumToSelectOptions(LockerLockTypeEnum)}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<Select
									label="Status"
									placeholder="Pick value"
									required
									data={enumToSelectOptions(LockerStatusEnum)}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<UserSelect
									label="User"
									required
									key={form.key("userId")}
									{...form.getInputProps("userId")}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<UserSelect
									label="Branch"
									required
									key={form.key("branchId")}
									{...form.getInputProps("branchId")}
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

export default forwardRef(LockerForm);
