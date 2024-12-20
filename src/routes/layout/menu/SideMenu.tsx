import { SheetContent, SheetHeader, SheetTitle } from "@/components/shadcn/Sheet";

import { PageLinks } from "../links/PageLinks";
import { SocialLinks } from "../links/SocialLinks";

export function SideMenu() {
	return (
		<SheetContent side='left'>
			<SheetHeader>
				<SheetTitle className='border-b border-b-primary-main'>Menu</SheetTitle>

				<div className='flex flex-col gap-6'>
					<PageLinks />

					<SocialLinks />
				</div>
			</SheetHeader>
		</SheetContent>
	);
}
