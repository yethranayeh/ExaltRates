type CurrencyKey = typeof import("./constant").currencies[number];
type RateDefinitions = Record<CurrencyKey, Record<CurrencyKey, string>> & { meta: { createdAt: string } };
