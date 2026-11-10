import { BsX } from 'react-icons/bs';

interface Props {
	onCloseModal: () => void;
	title?: string;
}

export default function ModalHeader({ onCloseModal, title }: Props) {
	return (
		<div className='flex flex-row justify-between w-full items-center '>
			<p className='flex justify-center items-center text-2xl font-semibold'>
				{title}
			</p>
			<button
				className='text-4xl self-end rounded hover:bg-gray/10 duration-300 transition'
				onClick={onCloseModal}
			>
				<BsX />
			</button>
		</div>
	);
}
