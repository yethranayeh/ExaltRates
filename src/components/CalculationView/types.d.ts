type ConversionResults = {
	conversions: Array<{ currency: CurrencyKey; calculation: number; confidence: number }>;
	highestConfidence: number;
};
