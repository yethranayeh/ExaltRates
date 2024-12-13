import { Currency } from "./Currency";

export function AmountDisplay({ rate, currencyName }: { rate: number; currencyName: CurrencyKey }) {
	return (
		<div className='flex flex-row select-none items-center text-lg'>
			<span>{rate.toFixed(2)}×</span>
			<Currency name={currencyName} />
		</div>
	);
}
