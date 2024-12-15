type CurrencyKey = typeof import("./constant").currencies[number];
type CurrencyObj = { mean: number | null; median: number | null };
type CurrencyData = CurrencyObj & { confidence: CurrencyObj };
type RateDefinitions = Record<CurrencyKey, Record<CurrencyKey, CurrencyData>> & {
	meta: { createdAt: string };
};
type SetStateFn<T> = import("react").Dispatch<import("react").SetStateAction<T>>;
