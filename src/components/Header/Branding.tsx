import { CurrencyIcon } from "../CurrencyIcon";

export const Branding = () => (
	<div className='flex items-center '>
		<CurrencyIcon size={32} name='Exalted Orb' />
		<div className='flex flex-col '>
			<span className='font-bold select-none font-[FontinSmallCaps] leading-[0.5]'>Exalt</span>
			<span className='text-xl font-bold select-none font-[FontinSmallCaps] leading-[0.8]'>Rates</span>
		</div>
	</div>
);
