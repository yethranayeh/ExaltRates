import clsx from "clsx";

import { CurrencyIcon } from "../CurrencyIcon";
import { currencies } from "../../constant";

type Props = {
	selected: CurrencyKey | "";
	setSelected: SetStateFn<Props["selected"]>;
};

export const CurrencySelection = ({ selected, setSelected }: Props) => (
	<section className='lg:row-span-2 grid grid-cols-10 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 w-max gap-1 h-max border-primary-darker border-b pb-2 lg:border-b-0 lg:pb-0 lg:border-r lg:border-1  lg:pr-2'>
		{currencies.map((c, index) => (
			<button
				key={c}
				title={c}
				className={clsx(
					"hover:opacity-100 transition-all cursor-pointer flex items-center",
					selected === c ? "opacity-100 scale-110 lg:scale-105" : "opacity-50"
				)}
				onClick={() => setSelected(c)}>
				<CurrencyIcon index={index} />
				<span className='hidden md:block'>{c}</span>
			</button>
		))}
	</section>
);
