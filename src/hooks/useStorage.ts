import { useContext } from "react";
import { StorageContext } from "../context/StorageContext";

export function useStorage() {
	const context = useContext(StorageContext);

	return context;
}
