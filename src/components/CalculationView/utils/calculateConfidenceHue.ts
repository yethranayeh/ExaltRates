import { differenceInHours } from "date-fns";

const maxStaleHours = 24;

export function calculateConfidenceHue(confidence: number, highestConfidence: number, recordedAt: string) {
	const baseScore = confidence / highestConfidence;

	const hoursElapsed = differenceInHours(new Date(), recordedAt);

	// 1 = fully stale, 0 = fresh
	const staleFactor = Math.min(hoursElapsed / maxStaleHours, 1);

	const adjustedConfidence = baseScore * (1 - staleFactor);

	// 0 = red, 120 = green
	return adjustedConfidence * 120;
}
