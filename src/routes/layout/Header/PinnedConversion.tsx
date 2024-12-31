import { PinOff } from "lucide-react";
import clsx from "clsx";

import { useStorage } from "@/hooks/useStorage";
import { convert } from "@/utils/convert";

import { CurrencyIcon } from "@/components/CurrencyIcon";

export function PinnedConversion() {
	const {
		cache: cachedCurrencyMap,
		setPreferences,
		preferences: { pinned }
	} = useStorage();

	if (!pinned || !cachedCurrencyMap) {
		return null;
	}

	const conversionRate = convert(pinned.primary, pinned.secondary, cachedCurrencyMap).rate;

	return (
		<div className='flex gap-1 select-none items-center text-primary-main text-md self-center sm:text-lg'>
			<div className='flex flex-row items-center'>
				<span>1×</span>
				<CurrencyIcon size={30} name={pinned.primary} />
			</div>
			<span>equals</span>
			<div
				className={clsx("flex flex-row items-center ml-1", conversionRate === null ? "text-red-900" : undefined)}
				title={conversionRate == null ? "No exchange rate available from the latest collected data" : undefined}>
				<span>{conversionRate ? conversionRate?.toFixed(2) : "?"}×</span>
				<CurrencyIcon size={30} name={pinned.secondary} />
			</div>
			<button
				title='Unpin conversion'
				type='button'
				className='ml-2 text-primary-main hover:text-primary-light transition-colors'
				onClick={() => setPreferences({ pinned: null })}>
				<PinOff className='w-4 h-4' />
			</button>
		</div>
	);
}
