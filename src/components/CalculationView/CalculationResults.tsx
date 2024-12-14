import { AmountDisplay } from "../AmountDisplay";

export const CalculationResults = ({ results }: { results: Array<{ currency: CurrencyKey; calculation: number }> }) => (
	<div className='flex flex-col w-max self-start'>
		{results.map((res) => (
			<AmountDisplay key={res.currency} rate={res.calculation} currencyName={res.currency} />
		))}
	</div>
);
