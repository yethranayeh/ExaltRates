import clsx from "clsx";
import { Currency } from "./Currency";

export function AmountDisplay({
	smaller,
	rate,
	currencyName
}: {
	smaller?: boolean;
	rate: number;
	currencyName: CurrencyKey;
}) {
	return (
		<div className={clsx("flex flex-row select-none items-center", smaller ? "text-sm" : "text-lg")}>
			<span>{rate.toFixed(2)}×</span>
			<Currency name={currencyName} />
		</div>
	);
}
