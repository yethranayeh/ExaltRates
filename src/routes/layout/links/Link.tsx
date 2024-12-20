import { cn } from "@/components/shadcn/lib/utils";
import { Link as RouterLink } from "react-router";

export const Link = ({ Icon, to, text, selected }: { Icon?: any; to: string; text: string; selected?: boolean }) => (
	<RouterLink
		to={to}
		className={cn(
			"inline-flex gap-1 font-[FontinBold]  transition-colors hover:text-primary-lighter hover:underline",
			selected ? "underline" : undefined
		)}>
		{!Icon && <Icon />} {text}
	</RouterLink>
);
