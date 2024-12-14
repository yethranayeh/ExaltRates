import type { PropsWithChildren } from "react";

import { useCurrencyMapData } from "../hooks/useCurrencyMap";
import { CurrencyMapContext } from "../context/CurrencyMapContext";

export function CurrencyMapProvider(props: PropsWithChildren) {
	const currencyMap = useCurrencyMapData();

	return <CurrencyMapContext.Provider value={currencyMap}>{props.children}</CurrencyMapContext.Provider>;
}
