import { useCurrencyMapData } from "@/hooks/useCurrencyMap";
import { calculateConfidenceHue } from "./utils/calculateConfidenceHue";

export function ConfidenceColor({ confidence, highestConfidence }: { confidence: number; highestConfidence: number }) {
	const currencyMap = useCurrencyMapData()!;

	return (
		<div
			className='flex items-center justify-center min-w-[3px] max-w-[2px] min-h-[20px] overflow-hidden  text-transparent font-[FontinBold] text-nowrap text-xs select-none transition-all hover:min-w-[104px] hover:text-white hover:px-1'
			style={{
				backgroundColor: `hsl(${calculateConfidenceHue(
					confidence,
					highestConfidence,
					currencyMap.meta.createdAt
				)}, 70%, 50%)`
			}}>
			<span>Confidence: {confidence}%</span>
		</div>
	);
}
