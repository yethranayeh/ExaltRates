import { memo } from "react";
import { InfoIcon } from "lucide-react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "../shadcn/Dialog";
import { AmountDisplay } from "../AmountDisplay";
import { Button } from "../shadcn/Button";

const Component = () => (
	<Dialog>
		<DialogTrigger
			className='flex gap-1 items-center text-primary-dark opacity-50 text-sm italic select-none cursor-pointer hover:opacity-75 hover:underline'
			title='Tell me more'>
			<InfoIcon className='w-5 h-5' />
			<span>Currencies with no data are hidden</span>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Why are some currencies hidden?</DialogTitle>
				<DialogDescription className='flex flex-col gap-2'>
					<p>
						Due the way I gather data for this website, the only way for me to show a conversion rate is for that
						currency to be listed on PoE 2 trading page.
					</p>
					<span>For example, if anyone requests</span>
					<div className='flex gap-1 items-center my-[-12px]'>
						<AmountDisplay smaller rate={10} currencyName="Armourer's Scrap" /> <span>for</span>{" "}
						<AmountDisplay smaller rate={0.5} currencyName='Vaal Orb' />
					</div>
					<span>then I can also list it here.</span>
				</DialogDescription>
			</DialogHeader>
			<DialogFooter className='sm:justify-start'>
				<DialogClose asChild>
					<Button type='button'>Okay</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export const HiddenDataInfo = memo(Component);
