import { Menu } from "lucide-react";
import { useAtom } from "jotai";

import { menuOpenAtom } from "@/state/menu.atom";

export function MenuButton() {
	const [_, setIsMenuOpen] = useAtom(menuOpenAtom);

	return (
		<button type='button' onClick={() => setIsMenuOpen((prev) => !prev)} className='inline-block md:hidden'>
			<Menu className='w-8 h-8' />
		</button>
	);
}
