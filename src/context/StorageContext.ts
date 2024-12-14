import { createContext } from "react";
import { getCache, getPreferences } from "../utils/storage";

export const StorageContext = createContext<IStorage>({
	cache: getCache(),
	setCache: () => {},
	preferences: getPreferences(),
	setPreferences: () => {}
});
