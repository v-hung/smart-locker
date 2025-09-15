import { createContext, useContext } from "react";
import { useBranches } from "../hooks/useBranches";

type BranchContextType = ReturnType<typeof useBranches>;

const BranchContext = createContext<BranchContextType | null>(null);

export function BranchProvider({ children }: { children: React.ReactNode }) {
	const value = useBranches();
	return (
		<BranchContext.Provider value={value}>{children}</BranchContext.Provider>
	);
}

export function useBranchContext() {
	const ctx = useContext(BranchContext);
	if (!ctx)
		throw new Error("useBranchesContext must be used within BranchesProvider");
	return ctx;
}
