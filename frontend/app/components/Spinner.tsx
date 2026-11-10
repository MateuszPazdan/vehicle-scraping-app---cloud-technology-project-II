import { ImSpinner2 } from 'react-icons/im';

const spinnerSize = {
	small: 'text-2xl',
	medium: 'text-3xl',
	large: 'text-5xl',
};

interface SpinnerProps {
	size: 'small' | 'medium' | 'large';
	color?: string;
}

function Spinner({ size, color }: SpinnerProps) {
	return (
		<span className='flex justify-center items-center h-full w-full '>
			<ImSpinner2 className={`animate-spin ${spinnerSize[size]} ${color}`} />
		</span>
	);
}

export default Spinner;
