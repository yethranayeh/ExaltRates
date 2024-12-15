import { Pin, PinOff } from "lucide-react";
import clsx from "clsx";

import { useStorage } from "../../hooks/useStorage";

import { AmountDisplay } from "../AmountDisplay";

function PinButton({ primary, secondary }: { primary: CurrencyKey; secondary: CurrencyKey }) {
	const {
		setPreferences,
		preferences: { pinned }
	} = useStorage();

	const isCurrentlyPinned = pinned?.primary === primary && pinned?.secondary === secondary;

	return (
		<button
			title={isCurrentlyPinned ? "Unpin" : "Pin to top"}
			type='button'
			className={clsx(
				"hover:text-primary-main transition-colors",
				isCurrentlyPinned ? "text-primary-main" : "text-primary-dark"
			)}
			onClick={() => {
				setPreferences(
					isCurrentlyPinned
						? { pinned: null }
						: {
								pinned: {
									primary: primary,
									secondary: secondary
								}
						  }
				);
			}}>
			{isCurrentlyPinned ? <PinOff className='w-4 h-4' /> : <Pin className='w-4 h-4' />}
		</button>
	);
}

type Props = {
	primary: CurrencyKey;
	results: ConversionResults;
};

export const CalculationResults = ({ primary, results }: Props) => (
	<div className='flex flex-col w-max self-start'>
		{results.conversions.map((res) => (
			<div key={res.currency} className='mt-[-4px] flex gap-2 w-full items-center relative'>
				<PinButton primary={primary} secondary={res.currency} />

				<div
					className='flex flex-row items-center gap-1'
					title={`Based on the collected data, confidence rating for this calculation is: ${res.confidence}%`}>
					<div
						className='flex items-center justify-center min-w-[2px] max-w-[2px] min-h-[20px] overflow-hidden  text-transparent font-[FontinBold] text-nowrap text-xs select-none transition-all hover:min-w-[104px] hover:text-white hover:px-1'
						style={{ backgroundColor: `hsl(${(res.confidence / results.highestConfidence) * 120}, 70%, 50%)` }}>
						<span>Confidence: {res.confidence}%</span>
					</div>
					<AmountDisplay rate={res.calculation} currencyName={res.currency} />
				</div>
			</div>
		))}
	</div>
);
