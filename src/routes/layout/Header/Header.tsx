import { PinnedConversion } from "./PinnedConversion";
import { memo } from "react";

import { Branding } from "./Branding";
import { MenuButton } from "./MenuButton";

export const Component = () => (
	<div className='w-screen flex justify-between items-center p-2 border-b border-primary-dark'>
		<div className='flex gap-1'>
			<MenuButton />
			<Branding />
		</div>
		<PinnedConversion />

		<div className='hidden sm:block' />
	</div>
);

export const Header = memo(Component);
