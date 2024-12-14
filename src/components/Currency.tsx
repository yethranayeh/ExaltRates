import { currencies } from "../constant";
import { CurrencyIcon } from "./CurrencyIcon";

export function Currency({ name }: { name: CurrencyKey }) {
	return (
		<div className='flex flex-row items-center gap-1'>
			<CurrencyIcon index={currencies.indexOf(name)} />
			<span className='font-[FontinBold] min-w-max'>{name}</span>
		</div>
	);
}
