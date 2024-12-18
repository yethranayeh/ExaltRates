import { ComponentProps } from "react";
import { CurrencyIcon } from "./CurrencyIcon";

type Props = {
	name: CurrencyKey;
	IconProps?: Partial<ComponentProps<typeof CurrencyIcon>>;
};

export function Currency({ name, IconProps }: Props) {
	return (
		<div className='flex flex-row items-center'>
			<CurrencyIcon {...IconProps} name={name} />
			<span className='font-[FontinBold] min-w-max'>{name}</span>
		</div>
	);
}
