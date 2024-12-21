import { NavLink } from "react-router";

import { cn } from "@/components/shadcn/lib/utils";
import { ChevronRight } from "lucide-react";

export const Link = ({ Icon, to, text }: { Icon?: any; to: string; text: string }) => (
	<NavLink
		to={to}
		className={({ isActive }) =>
			cn(
				"inline-flex items-center group font-[FontinBold] w-max transition-colors hover:text-primary-light hover:underline",
				isActive ? "underline text-primary-light" : undefined
			)
		}>
		{({ isActive }) => (
			<>
				{Icon ? (
					<Icon />
				) : (
					<ChevronRight className={cn("w-0 h-6 transition-all group-hover:w-6 ", isActive ? "w-6" : undefined)} />
				)}{" "}
				<span>{text}</span>
			</>
		)}
	</NavLink>
);
