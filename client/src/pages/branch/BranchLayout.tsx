import React from "react";
import { BranchProvider } from "../../features/branch/contexts/BranchContext";
import { Outlet } from "react-router";
import BranchDeleteModal from "../../features/branch/components/BranchDeleteModal";

export function Component() {
	return (
		<BranchProvider>
			<Outlet />
			<BranchDeleteModal />
		</BranchProvider>
	);
}
