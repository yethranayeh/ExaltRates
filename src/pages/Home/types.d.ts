type Conversions = Array<{ currency: CurrencyKey; calculation: number; confidence: number }>;
type ConversionResults = {
	all: Conversions;
	highConfidence: Conversions;
	highestConfidence: number;
};
