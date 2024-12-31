import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/Accordion";

import { faqItems } from "./faq-items";

export const FAQPage = () => (
	<Accordion type='single' collapsible className='w-full max-w-[768px]'>
		{faqItems.map((item, index) => (
			<AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
				<AccordionTrigger>{item.question}</AccordionTrigger>
				<AccordionContent>{item.answer}</AccordionContent>
			</AccordionItem>
		))}
		<AccordionItem value='item-special'>
			<AccordionTrigger>Can I suggest features or improvements?</AccordionTrigger>
			<AccordionContent>
				Yes! In fact, I would love to hear your feedback on what you liked or didn't like, what needs improvement or
				what can be added! If you have any feedback or suggestions, feel free to e-mail me at{" "}
				<a href='mailto:contact@exaltrates.trade' className='underline'>
					contact@exaltrates.trade
				</a>
				, or if you have found a bug, you can{" "}
				<a href='https://github.com/yethranayeh/ExaltRates/issues/new/choose' target='_blank' className='underline'>
					create a new issue from this link.
				</a>
			</AccordionContent>
		</AccordionItem>
	</Accordion>
);
