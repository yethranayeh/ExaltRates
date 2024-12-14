import { memo } from "react";

export const Component = () => (
	<footer className='p-2 text-center text-sm text-primary-dark'>
		This website is not affiliated with, maintained, endorsed or sponsored by Grinding Gear Games or any of its
		affiliates.
	</footer>
);

export const Footer = memo(Component);
