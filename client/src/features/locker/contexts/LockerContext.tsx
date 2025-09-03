import { createContext, useContext } from "react";
import { useLockers } from "../hooks/useLockers";

type LockersContextType = ReturnType<typeof useLockers>;

const LockersContext = createContext<LockersContextType | null>(null);

export function LockersProvider({ children }: { children: React.ReactNode }) {
	const value = useLockers();
	return (
		<LockersContext.Provider value={value}>{children}</LockersContext.Provider>
	);
}

export function useLockersContext() {
	const ctx = useContext(LockersContext);
	if (!ctx)
		throw new Error("useLockersContext must be used within LockersProvider");
	return ctx;
}
