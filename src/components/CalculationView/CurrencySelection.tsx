import type { ChangeEvent } from "react";

import { useCallback } from "react";
import clsx from "clsx";

import { CurrencyIcon } from "../CurrencyIcon";
import { currencies } from "../../constant";
import { Input } from "../shadcn/Input";
import { Currency } from "../Currency";

type Props = {
	value: string;
	setValue: SetStateFn<string>;
	selected: CurrencyKey | "";
	setSelected: SetStateFn<Props["selected"]>;
};

export function CurrencySelection({ value, setValue, selected, setSelected }: Props) {
	const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const numberRegex = /[+-]?(\d+([.]\d*)?|[.]\d+)/;

		const nextValue = e.target.value.replace(",", ".");

		console.log({ nextValue, test: numberRegex.test(nextValue) });

		const isValidValue = nextValue === "" || numberRegex.test(nextValue);
		const hasMultiplePeriods = (nextValue.match(/\./g)?.length ?? 0) > 1;

		if (isValidValue && !hasMultiplePeriods) {
			setValue(nextValue);
		}
	}, []);
	return (
		<section className='flex flex-col gap-4 items-center'>
			<div className='grid grid-cols-10 w-max'>
				{currencies.map((c, index) => (
					<button
						key={c}
						className={clsx(
							"hover:opacity-100 transition-opacity cursor-pointer",
							selected === c ? "opacity-100" : "opacity-50"
						)}
						onClick={() => setSelected(c)}>
						<CurrencyIcon index={index} />
					</button>
				))}
			</div>

			{selected ? (
				<div className='flex items-center gap-1 w-full'>
					{/* FIXME: Input shrinks when longer names are selected. e.g. Whetstone */}
					<Input
						value={value}
						className='min-w-[60px] w-[60px] max-w-[60px]'
						inputMode='decimal'
						onChange={handleValueChange}
					/>
					<span className='ml-[-5px]'>×</span>
					<Currency name={selected} />
					<span> equals</span>
				</div>
			) : (
				<div>Please select currency</div>
			)}
		</section>
	);
}
