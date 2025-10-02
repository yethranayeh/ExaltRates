import { Link } from "./Link";

export const PageLinks = () => (
	<div className='flex flex-col text-2xl w-max text-primary-dark'>
		<Link to='/' text='Home' />
		{/* <Link to='/charts' text='Charts' /> */}
		<Link to='/faq' text='F.A.Q.' />
	</div>
);
