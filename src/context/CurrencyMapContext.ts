import { createContext } from "react";

export const CurrencyMapContext = createContext<Array<RateDefinitions> | null>(null);
