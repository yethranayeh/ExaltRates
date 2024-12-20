import { PinOff } from "lucide-react";
import clsx from "clsx";

import { getCache } from "@/utils/storage";
import { convert } from "@/utils/convert";
import { useStorage } from "@/hooks/useStorage";

import { CurrencyIcon } from "@/components/CurrencyIcon";

export function PinnedConversion() {
	const {
		setPreferences,
		preferences: { pinned }
	} = useStorage();
	const currencyMap = getCache();

	if (!pinned || !currencyMap) {
		return null;
	}

	const conversionRate = convert(pinned.primary, pinned.secondary, currencyMap).rate;

	return (
		<div className='flex gap-1 select-none items-center text-primary-main text-md self-center sm:text-lg'>
			<div className='flex flex-row items-center'>
				<span>1×</span>
				<CurrencyIcon size={30} name={pinned.primary} />
			</div>
			<span>equals</span>
			<div className={clsx("flex flex-row items-center ml-1", conversionRate === null ? "text-red-900" : undefined)}>
				<span>{conversionRate ? conversionRate?.toFixed(2) : 0}×</span>
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
