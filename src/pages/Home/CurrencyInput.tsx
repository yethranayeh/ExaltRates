import type { ChangeEvent } from "react";
import { useCallback } from "react";
import { Star, StarOff } from "lucide-react";

import { useStorage } from "@/hooks/useStorage";

import { Currency } from "@/components/Currency";
import { Input } from "@/components/shadcn/Input";

function StarButton({ currency }: { currency: CurrencyKey }) {
	const { setPreferences, preferences } = useStorage();
	const isSelected = preferences.starred === currency;

	return (
		<button
			title={`Select "${currency}" on page load`}
			onClick={() => setPreferences(isSelected ? { starred: null } : { starred: currency })}>
			{isSelected ? (
				<StarOff className='w-4 h-4' />
			) : (
				<Star className='w-4 h-4 text-primary-dark hover:text-primary-main transition-colors' />
			)}
		</button>
	);
}

type Props = {
	value: string;
	setValue: SetStateFn<string>;
	selected: CurrencyKey;
};

export function CurrencyInput({ value, setValue, selected }: Props) {
	const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const numberRegex = /[+-]?(\d+([.]\d*)?|[.]\d+)/;

		const nextValue = e.target.value.replace(",", ".");

		const isValidValue = nextValue === "" || numberRegex.test(nextValue);
		const hasMultiplePeriods = (nextValue.match(/\./g)?.length ?? 0) > 1;

		if (isValidValue && !hasMultiplePeriods) {
			setValue(nextValue);
		}
	}, []);
	return (
		<div className='flex items-center gap-1 w-full'>
			<StarButton currency={selected} />
			<Input
				value={value}
				className='min-w-[60px] w-[60px] max-w-[60px]'
				inputMode='decimal'
				onChange={handleValueChange}
			/>
			<span className='ml-[-5px]'>×</span>
			<Currency name={selected} IconProps={{ size: 26 }} />
			<span> equals</span>
		</div>
	);
}
