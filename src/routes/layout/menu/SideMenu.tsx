import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/shadcn/Sheet";

import { PageLinks } from "../links/PageLinks";
import { SocialLinks } from "../links/SocialLinks";
import { useAtom } from "jotai";
import { menuOpenAtom } from "@/state/menu.atom";
import { useLocation } from "react-router";
import { useEffect } from "react";

export function SideMenu() {
	const [isMenuOpen, setIsMenuOpen] = useAtom(menuOpenAtom);
	const location = useLocation();

	useEffect(() => {
		setIsMenuOpen(false);
	}, [location.pathname]);

	return (
		<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
			<SheetContent side='left'>
				<SheetHeader>
					<SheetTitle className='border-b border-b-primary-main'>Menu</SheetTitle>

					<div className='flex flex-col gap-6'>
						<PageLinks />

						<SocialLinks />
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
