import { Link as RouterLink } from "react-router";

import { cn } from "@/components/shadcn/lib/utils";

export const Link = ({ Icon, to, text, selected }: { Icon?: any; to: string; text: string; selected?: boolean }) => (
	<RouterLink
		to={to}
		className={cn(
			"inline-flex gap-2 font-[FontinBold] w-max transition-colors hover:text-primary-lighter hover:underline",
			selected ? "underline" : undefined
		)}>
		{Icon && <Icon />} {text}
	</RouterLink>
);
