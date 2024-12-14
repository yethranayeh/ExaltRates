import { useContext } from "react";
import { PinOff } from "lucide-react";
import clsx from "clsx";

import { getCache } from "../../utils/storage";
import { convert } from "../../utils/convert";
import { StorageContext } from "../../context/StorageContext";
import { CurrencyIcon } from "../CurrencyIcon";

import { currencies } from "../../constant";

export function PinnedConversion() {
	const {
		setPreferences,
		preferences: { pinned }
	} = useContext(StorageContext);
	const currencyMap = getCache();

	if (!pinned || !currencyMap) {
		return null;
	}

	const conversionRate = convert(pinned.primary, pinned.secondary, currencyMap);

	return (
		<div className='flex select-none items-center text-primary-dark text-sm'>
			<div className='flex flex-row items-center'>
				<span>1×</span>
				<CurrencyIcon size={30} index={currencies.indexOf(pinned.primary)} />
			</div>
			<span>equals</span>
			<div className={clsx("flex flex-row items-center ml-1", conversionRate === null ? "text-red-900" : undefined)}>
				<span>{conversionRate ? conversionRate?.toFixed(2) : 0}×</span>
				<CurrencyIcon size={30} index={currencies.indexOf(pinned.secondary)} />
			</div>
			<button
				title='Unpin conversion'
				type='button'
				className='text-primary-dark ml-2'
				onClick={() => {
					setPreferences({ pinned: null });
				}}>
				<PinOff className='w-4 h-4' />
			</button>
		</div>
	);
}
