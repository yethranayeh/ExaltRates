import { calculateConfidenceHue } from "./utils/calculateConfidenceHue";

type Props = { confidence: number; highestConfidence: number; timeString: string };

export const ConfidenceColor = ({ confidence, highestConfidence, timeString }: Props) => (
	<div
		className='flex items-center justify-center min-w-[3px] max-w-[2px] min-h-[20px] overflow-hidden  text-transparent font-[FontinBold] text-nowrap text-xs select-none transition-all hover:min-w-[114px] hover:text-white hover:px-1'
		style={{
			backgroundColor: `hsl(${calculateConfidenceHue(confidence, highestConfidence, timeString)}, 70%, 50%)`
		}}>
		<span>Confidence: {confidence.toFixed(2)}%</span>
	</div>
);
