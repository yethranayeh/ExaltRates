import { useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { getCache, getPreferences, setCache, setPreferences } from "./storage";
import { StorageContext } from "../context/StorageContext";
import { CurrencyMapContext } from "../context/CurrencyMapContext";

export function StorageProvider(props: PropsWithChildren) {
	const currencyMap = useContext(CurrencyMapContext);
	const [cacheState, setCacheState] = useState(getCache());
	const [preferencesState, setPreferencesState] = useState(getPreferences());

	function update(type: "cache" | "preference", data: any) {
		if (type === "cache") {
			setCacheState(data);
			setCache(data);
		} else {
			setPreferencesState(data);
			setPreferences(data);
		}
	}

	const value = useMemo<IStorage>(
		() => ({
			cache: cacheState,
			setCache: (data) => update("cache", data),
			preferences: preferencesState,
			setPreferences: (pref) => {
				const newPrefs = { ...preferencesState, ...pref };
				update("preference", newPrefs);
			}
		}),
		[cacheState, preferencesState]
	);

	useEffect(() => {
		if (currencyMap) {
			update("cache", currencyMap);
		}
	}, [currencyMap]);

	return <StorageContext.Provider value={value}>{props.children}</StorageContext.Provider>;
}
