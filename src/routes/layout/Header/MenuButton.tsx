import { Menu } from "lucide-react";

import { Sheet, SheetTrigger } from "@/components/shadcn/Sheet";

import { SideMenu } from "../menu/SideMenu";

export function MenuButton() {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu className='w-8 h-8' />
			</SheetTrigger>

			<SideMenu />
		</Sheet>
	);
}
