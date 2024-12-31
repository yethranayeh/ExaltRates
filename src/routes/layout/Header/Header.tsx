import { PinnedConversion } from "./PinnedConversion";
import { memo } from "react";

import { Branding } from "./Branding";
import { MenuButton } from "./MenuButton";
import { PageLinks } from "../links/PageLinks";

export const Component = () => (
	<div className='w-screen flex justify-between items-center p-2 border-b border-primary-dark'>
		<div className='flex gap-1'>
			<MenuButton />
			<Branding />
		</div>
		<PinnedConversion />

		<div className='hidden md:block md:pr-4 md:w-[240px] [&>div]:flex-row [&>div]:justify-end [&>div]:text-lg [&>div]:gap-2'>
			<PageLinks />
		</div>
	</div>
);

export const Header = memo(Component);
