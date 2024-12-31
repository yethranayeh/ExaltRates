export function convert(from: CurrencyKey, to: CurrencyKey, ratesData: RateDefinitions) {
	const fromData = ratesData[from];

	if (!fromData) {
		return { rate: null, confidence: null };
	}

	const toData = ratesData[to];

	if (!toData) {
		return { rate: null, confidence: null };
	}

	const { mean, median, confidence } = ratesData[from][to];
	const result: { rate: number | null; confidence: number | null } = { rate: null, confidence: null };

	if (!confidence) {
		return { rate: mean, confidence: null };
	}

	const { mean: confMean, median: confMedian } = confidence;

	if (confMean != null && confMedian != null) {
		return confMean > confMedian ? { rate: mean, confidence: confMean } : { rate: median, confidence: confMedian };
	}

	if (confMean != null) {
		return { rate: mean, confidence: confMean };
	}

	if (confMedian != null) {
		return { rate: median, confidence: confMedian };
	}

	return result;
}
