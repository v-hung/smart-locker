import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Button } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { wrapPromise } from "@/utils/promise.utils";
import { branchApi } from "@/lib/apiClient";
import { redirect, useLoaderData } from "react-router";
import type { BranchWithRelations } from "@/generate-api";
import BranchForm, {
	type BranchFormRef,
} from "@/features/branch/components/BranchForm";
import { useRef } from "react";

export const loader = wrapProtectedLoader(async ({ params }) => {
	const { id } = params;

	if (!id) {
		return null;
	}

	const data = await wrapPromise(() => branchApi.apiBranchesIdGet({ id }));

	if (!data) {
		throw redirect("/branches");
	}

	return data;
});

export function Component() {
	const data = useLoaderData() as BranchWithRelations;

	const formRef = useRef<BranchFormRef>(null);

	return (
		<MainContent>
			<MainHeader
				title="Branches"
				description="Track, manage, and optimize your branches"
				rightSection={
					<Button
						variant="light"
						leftSection={<IconCirclePlusFilled size={24} />}
						onClick={formRef.current?.submit}
					>
						Save
					</Button>
				}
				breadcrumbs={[
					{ label: "Branches", path: "/branches" },
					{ label: `${data ? "Edit" : "Create"} a branch` },
				]}
				sticky
			/>

			<MainBody>
				<BranchForm ref={formRef} data={data} />
			</MainBody>
		</MainContent>
	);
}
