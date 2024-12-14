import type { ChangeEvent } from "react";
import { useCallback } from "react";

import { Currency } from "../Currency";
import { Input } from "../shadcn/Input";

type Props = {
	value: string;
	setValue: SetStateFn<string>;
	selected: CurrencyKey;
};

export function CurrencyInput({ value, setValue, selected }: Props) {
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
		<div className='flex items-center gap-1 w-full h-9'>
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
	);
}
