type CurrencyKey = typeof import("./constant").currencies[number];
type RateDefinitions = Record<CurrencyKey, Record<CurrencyKey, { mean: number | null; median: number | null }>> & {
	meta: { createdAt: string };
};
type SetStateFn<T> = import("react").Dispatch<import("react").SetStateAction<T>>;
