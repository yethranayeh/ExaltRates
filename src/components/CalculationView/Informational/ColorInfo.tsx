import { MessageSquareWarning } from "lucide-react";

import { useStorage } from "../../../hooks/useStorage";
import { useCurrencyMapData } from "../../../hooks/useCurrencyMap";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../shadcn/Accordion";
import { Button } from "../../shadcn/Button";

export function ColorInfo() {
	const currencyMap = useCurrencyMapData();

	const {
		setPreferences,
		preferences: { hide }
	} = useStorage();

	if (hide.colorInfo) {
		return null;
	}

	return (
		<Accordion type='single' collapsible>
			<AccordionItem value='info'>
				<AccordionTrigger>
					<div className='flex items-center gap-1'>
						<div className='animate-bounce'>
							<MessageSquareWarning className='w-6 h-6  scale-x-[-1]' />
						</div>
						<span>What do the colors represent?</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className='max-w-[400px] flex flex-col gap-2 items-start'>
					<p>
						The colors you see next to the price values represent <span className='underline'>confidence score</span> of
						that calculation.
					</p>
					<p>
						The score is influenced by the <span className='underline'>amount</span> of data available for that
						particular exchange and the{" "}
						<span
							className='underline'
							title={currencyMap ? new Date(currencyMap.meta.createdAt).toLocaleString() : ""}>
							time
						</span>{" "}
						when that exchange was recorded.
					</p>
					<p>
						When the color is closer to <span className='bg-red-700 px-1 text-white'>red</span>, it probably does not
						represent the latest exchange rates.
					</p>

					<p className='hidden md:inline'>You can also hover over the color indicator to see the exact score.</p>
					<Button
						variant='outline'
						onClick={() => setPreferences((prev) => ({ hide: { ...prev.hide, colorInfo: true } }))}>
						Do not show again
					</Button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
