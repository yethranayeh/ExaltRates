import { useState } from "react";
import clsx from "clsx";

import { useStorage } from "@/hooks/useStorage";

import { CurrencySelection } from "./CurrencySelection";
import { CalculationResults } from "./CalculationResults";
import { CurrencyInput } from "./CurrencyInput";
import ErrorBoundary from "@/components/ErrorBoundary";

export function CalculationView() {
	const { preferences } = useStorage();
	const [selected, setSelected] = useState<CurrencyKey | "">(preferences.starred ?? "");
	const [value, setValue] = useState("1");

	return (
		<div className='flex flex-col gap-4'>
			<div className='w-full flex justify-center'>
				<a href='https://pathofexile2.com/hunt' target='_blank'>
					<img alt='Dawn of the Hunt' src='/poe/doth.webp' className='w-44 sm:w-56 lg:w-64 transition-all' />
				</a>
			</div>
			<div className={clsx("flex flex-col h-min gap-4", "lg:gap-6 lg:flex-row")}>
				<CurrencySelection selected={selected} setSelected={setSelected} />

				<div className='flex flex-col h-full gap-4 md:min-w-[410px]'>
					{selected ? (
						<CurrencyInput value={value} setValue={setValue} selected={selected} />
					) : (
						<p>Please select a currency</p>
					)}

					<ErrorBoundary>{selected && <CalculationResults selected={selected} value={value} />}</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}
