import "./gears.css";
// https://codepen.io/Brian-Montierth/details/PVZRNj
export const Gears = ({ isLoading }: { isLoading?: boolean }) => (
	<div className={isLoading ? "loading" : undefined}>
		<div className='gears'>
			<div className='gear one'>
				<div className='bar'></div>
				<div className='bar'></div>
				<div className='bar'></div>
			</div>
			<div className='gear two'>
				<div className='bar'></div>
				<div className='bar'></div>
				<div className='bar'></div>
			</div>
			<div className='gear three'>
				<div className='bar'></div>
				<div className='bar'></div>
				<div className='bar'></div>
			</div>
		</div>
	</div>
);
