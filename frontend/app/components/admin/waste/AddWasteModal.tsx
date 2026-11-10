import {
	useCreateWasteMutation,
	useRetrieveWastesQuery,
	WasteBody,
} from '@/app/_redux/features/wasteApiSlice';
import ModalHeader from '../../ModalHeader';
import { useForm } from 'react-hook-form';
import Button from '../../Button';
import { toast } from 'react-toastify';

export default function AddWasteModal({
	onCloseModal,
}: {
	onCloseModal: () => void;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<WasteBody>();
	const [createWaste, { isLoading }] = useCreateWasteMutation();
	const { refetch: refetchWastes } = useRetrieveWastesQuery();

	const onSubmit = async (data: WasteBody) => {
		createWaste(data)
			.unwrap()
			.then(() => {
				toast.success('Odpad został dodany!');
				refetchWastes();
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error.data?.message || 'Wystąpił błąd podczas dodawania odpadu!'
				);
				console.error('Error creating waste:', error);
			});
	};
	return (
		<div>
			<ModalHeader onCloseModal={onCloseModal} title='Dodaj odpad' />
			<form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Nazwa odpadu</label>
					<input
						type='text'
						placeholder='Nazwa odpadu'
						{...register('name', { required: 'Podaj nazwę odpadu' })}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.name?.message}</p>
				</div>

				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Cena za kg</label>
					<input
						type='number'
						step='0.01'
						placeholder='Cena za kg'
						{...register('pricePerKg', {
							required: 'Podaj cenę za kg',
							valueAsNumber: true,
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>
						{errors.pricePerKg?.message}
					</p>
				</div>

				<div className='flex justify-end gap-4 pt-8'>
					<Button type='submit' disabled={isLoading}>
						{isLoading ? 'Dodawanie...' : 'Dodaj odpad'}
					</Button>

					<button
						type='button'
						onClick={onCloseModal}
						className='px-4 py-2 rounded hover:bg-gray/10 transition duration-300'
					>
						Anuluj
					</button>
				</div>
			</form>
		</div>
	);
}
