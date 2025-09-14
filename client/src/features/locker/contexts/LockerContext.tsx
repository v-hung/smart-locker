import { createContext, useContext } from "react";
import { useLockers } from "../hooks/useLockers";

type LockerContextType = ReturnType<typeof useLockers>;

const LockerContext = createContext<LockerContextType | null>(null);

export function LockerProvider({ children }: { children: React.ReactNode }) {
	const value = useLockers();
	return (
		<LockerContext.Provider value={value}>{children}</LockerContext.Provider>
	);
}

export function useLockerContext() {
	const ctx = useContext(LockerContext);
	if (!ctx)
		throw new Error("useLockersContext must be used within LockersProvider");
	return ctx;
}
