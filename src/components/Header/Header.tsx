import { Github } from "lucide-react";
import { PinnedConversion } from "./PinnedConversion";
import { memo } from "react";

export const Component = () => (
	<div className='w-screen flex justify-between items-center p-2 border-b border-primary-dark'>
		<span className='text-xl font-bold select-none font-[FontinSmallCaps]'>Exalt Rates</span>
		<PinnedConversion />
		<a href='https://github.com/yethranayeh/ExaltRates' target='_blank' title='Exalt Rates GitHub repository'>
			<Github className='h-8 w-8 p-1 rounded-md border border-primary-main' />
		</a>
	</div>
);

export const Header = memo(Component);
