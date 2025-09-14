import MainHeader from "@/layouts/components/MainHeader";
import { wrapProtectedLoader } from "@/utils/loader.utils";
import { Button } from "@mantine/core";
import MainContent from "@/layouts/components/MainContent";
import MainBody from "@/layouts/components/MainBody";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { LockerProvider } from "@/features/locker/contexts/LockerContext";
import { wrapPromise } from "@/utils/promise.utils";
import { lockerApi } from "@/lib/apiClient";
import { redirect, useLoaderData } from "react-router";
import type { Locker, LockerWithRelations } from "@/generate-api";
import LockerForm, {
	type LockerFormRef,
} from "@/features/locker/components/LockerForm";
import { useRef } from "react";

export const loader = wrapProtectedLoader(async ({ params }) => {
	const { id } = params;

	if (!id) {
		return null;
	}

	const data = await wrapPromise(() => lockerApi.apiLockersIdGet({ id }));

	if (!data) {
		throw redirect("/lockers");
	}

	return data;
});

export function Component() {
	const data = useLoaderData() as LockerWithRelations;

	const formRef = useRef<LockerFormRef>(null);

	return (
		<MainContent>
			<LockerProvider>
				<MainHeader
					title="Lockers"
					description="Track, manage, and optimize your lockers"
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
						{ label: "Lockers", path: "/lockers" },
						{ label: `${data ? "Edit" : "Create"} a locker` },
					]}
					sticky
				/>

				<MainBody>
					<LockerForm ref={formRef} data={data} />
				</MainBody>
			</LockerProvider>
		</MainContent>
	);
}
