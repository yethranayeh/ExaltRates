import { useContext } from "react";
import { CurrencyMapContext } from "../context/CurrencyMapContext";

export function useCurrencyMapData() {
	const currencyMap = useContext(CurrencyMapContext);

	return currencyMap;
}
