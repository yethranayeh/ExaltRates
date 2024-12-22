import { Link } from "react-router";
import { CurrencyIcon } from "@/components/CurrencyIcon";

export const Branding = () => (
	<Link to='/' className='flex items-center'>
		<CurrencyIcon size={32} name='Exalted Orb' />
		<span className='flex flex-col items-start'>
			<span className='font-bold select-none font-[FontinSmallCaps] leading-[0.5]'>Exalt</span>
			<span className='text-xl font-bold select-none font-[FontinSmallCaps] leading-[0.8]'>Rates</span>
		</span>
	</Link>
);
