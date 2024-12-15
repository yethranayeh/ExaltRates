import { AccordionItem } from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionTrigger } from "../../shadcn/Accordion";
import { useStorage } from "../../../hooks/useStorage";
import { MessageSquareWarning } from "lucide-react";
import { Button } from "../../shadcn/Button";

export function ColorInfo() {
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
						that calculation. There may not be enough examples of a currency exchange in the data pool to{" "}
						<span className='font-[FontinItalic]'>confidently</span> suggest a conversion value.{" "}
						<span className='hidden md:inline'>You can hover over the color to see the exact score.</span>
					</p>
					<div>
						<p>
							So, when the color is closer to <span className='bg-red-700 px-1 text-white'>red</span>, it probably does
							not represent real-world conversion rates.
						</p>
						<p>
							On the other hand, if you see the <span className='underline'>confidency score</span> leaning toward{" "}
							<span className='bg-green-700 px-1 text-white'>green</span>, that means, based on the amount of data we
							gathered for that particular exchange, we are confident about the result of that calculation.
						</p>
					</div>
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
