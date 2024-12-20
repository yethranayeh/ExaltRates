import type { PropsWithChildren } from "react";

export const CenterChild = ({ children }: PropsWithChildren) => (
	<div className='grid place-items-center w-screen h-screen'>{children}</div>
);
