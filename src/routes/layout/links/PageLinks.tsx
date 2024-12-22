import { Construction } from "lucide-react";
import { Link } from "./Link";

export const PageLinks = () => (
	<div className='flex flex-col text-2xl w-max text-primary-dark'>
		<Link to='/' text='Home' />
		<Link to='/charts' text='Charts' />
		<div className='flex flex-col mt-4 gap-1 text-primary-darker'>
			<Link to='/settings' text='Settings' Icon={Construction} />
			<Link to='/faq' text='F.A.Q.' Icon={Construction} />
		</div>
	</div>
);
