import clsx from "clsx";
import { memo } from "react";

import { CurrencyIcon } from "../CurrencyIcon";
import { currencies } from "../../constant";

type Props = {
	selected: CurrencyKey | "";
	setSelected: SetStateFn<Props["selected"]>;
};

export const Component = ({ selected, setSelected }: Props) => (
	<section
		className={clsx(
			"w-max grid grid-cols-10 gap-y-1 gap-x-0 h-max pb-4 border-primary-darker border-b",
			"md:grid-cols-4 md:gap-2",
			"lg:grid-cols-2 lg:row-span-2 lg:border-b-0 lg:pb-0 lg:pr-4 lg:border-r lg:border-1 "
		)}>
		{currencies.map((c) => (
			<button
				key={c}
				title={c}
				className={clsx(
					"hover:opacity-100 transition-all cursor-pointer flex items-center",
					selected === c ? "opacity-100 scale-110 lg:scale-105" : "opacity-50"
				)}
				onClick={() => setSelected(c)}>
				<CurrencyIcon name={c} />
				<span className='hidden text-sm md:block md:text-md lg:text-lg'>{c}</span>
			</button>
		))}
	</section>
);

export const CurrencySelection = memo(Component);
