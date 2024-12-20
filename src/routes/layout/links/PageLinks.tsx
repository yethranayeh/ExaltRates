import { ChartColumnDecreasing, CircleHelp, House, Settings } from "lucide-react";
import { Link } from "./Link";

export const PageLinks = () => (
	<div className='flex flex-col gap-1 text-lg'>
		<Link to='/' text='Home' Icon={House} />
		<Link to='/graphs' text='Graphs' Icon={ChartColumnDecreasing} />
		<Link to='/settings' text='Settings' Icon={Settings} />
		<Link to='/faq' text='F.A.Q.' Icon={CircleHelp} />
	</div>
);
