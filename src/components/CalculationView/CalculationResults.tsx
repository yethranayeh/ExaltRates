import { useContext } from "react";
import { Pin, PinOff } from "lucide-react";

import { AmountDisplay } from "../AmountDisplay";
import { StorageContext } from "../../context/StorageContext";

function PinButton({ primary, secondary }: { primary: CurrencyKey; secondary: CurrencyKey }) {
	const {
		setPreferences,
		preferences: { pinned }
	} = useContext(StorageContext);

	const isCurrentlyPinned = pinned?.primary === primary && pinned?.secondary === secondary;

	return (
		<button
			title={isCurrentlyPinned ? "Unpin" : "Pin to top"}
			type='button'
			className='text-primary-dark'
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
	results: Array<{ currency: CurrencyKey; calculation: number }>;
};

export const CalculationResults = ({ primary, results }: Props) => (
	<div className='flex flex-col w-max self-start'>
		{results.map((res) => (
			<div key={res.currency} className='mt-[-4px] flex justify-between gap-2 w-full'>
				<AmountDisplay rate={res.calculation} currencyName={res.currency} />
				<PinButton primary={primary} secondary={res.currency} />
			</div>
		))}
	</div>
);
