import type { currencies } from "../constant";

import { Currency } from "./Currency";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./shadcn/Select";

import { Input } from "./shadcn/Input";

type Props = {
	disabled?: boolean;
	value: string;
	setValue: (v: string) => void;
	currency: CurrencyKey | "";
	setCurrency: (c: CurrencyKey) => void;
	currencies: typeof currencies | Array<CurrencyKey>;
};

export const CurrencyInputs = ({ disabled, value, setValue, currency, setCurrency, currencies }: Props) => (
	<div className='flex w-full max-w-[360px]'>
		<Input
			disabled={disabled}
			value={value}
			onChange={(e) => {
				const val = e.target.value;
				if (/\d/.test(val) || val === "") {
					setValue(val);
				}
			}}
			className='min-h-[40px] max-w-[100px] border-r-0 rounded-r-none'
		/>
		<Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyKey)}>
			<SelectTrigger className='w-full rounded-l-none'>
				<SelectValue placeholder='Choose Currency' />
			</SelectTrigger>
			<SelectContent>
				{currencies.map((c) => (
					<SelectItem key={c} value={c}>
						<Currency name={c} />
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);
