import { Construction } from "lucide-react";
import { Link } from "./Link";

export const PageLinks = () => (
	<div className='flex flex-col gap-4 text-2xl w-max'>
		<Link to='/' text='Home' />
		<div className='flex flex-col gap-1 text-primary-darker'>
			<Link to='/graphs' text='Graphs' Icon={Construction} />
			<Link to='/settings' text='Settings' Icon={Construction} />
			<Link to='/faq' text='F.A.Q.' Icon={Construction} />
		</div>
	</div>
);
