import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalHeader from '../../ModalHeader';
import ChooseWasteType from '../storage/ChooseWasteType';
import {
	useCreateWasteEntryMutation,
	useRetrieveWasteEntriesByVehicleIdQuery,
	Waste,
} from '@/app/_redux/features/wasteApiSlice';
import Button from '../../Button';
import { toast } from 'react-toastify';

type FormValues = {
	weight: number;
};

export default function AssignWasteModal({
	onCloseModal,
	vehicleId,
}: {
	onCloseModal: () => void;
	vehicleId: number;
}) {
	const [wasteType, setWasteType] = useState<Waste | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const [createWasteEntry, { isLoading }] = useCreateWasteEntryMutation();
	const { refetch: refetchWastes } =
		useRetrieveWasteEntriesByVehicleIdQuery(vehicleId);

	const onSubmit = (data: FormValues) => {
		if (!wasteType) {
			toast.error('Wybierz typ odpadu!');
		}

		createWasteEntry({
			vehicleId: vehicleId,
			wasteTypeId: wasteType?.id || 0,
			weight: data.weight,
		})
			.unwrap()
			.then(() => {
				toast.success('Przypisano odpad');
				refetchWastes();
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error.data?.message || 'Wystąpił błąd podczas przypisywania odpadu!'
				);
				console.error('Error creating waste:', error);
			});
	};

	return (
		<div className='p-6 space-y-10'>
			<ModalHeader onCloseModal={onCloseModal} title='Przypisywanie odpadów' />
			<form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
				<ChooseWasteType wasteType={wasteType} setWasteType={setWasteType} />

				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Waga odpadu</label>
					<input
						type='number'
						step='0.01'
						placeholder='Waga odpadu'
						{...register('weight', {
							required: 'Waga jest wymagana',
							min: { value: 0.01, message: 'Minimalna waga to 0.01 kg' },
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.weight?.message}</p>
				</div>

				<div className='flex justify-end gap-4 pt-8'>
					<Button type='submit' isLoading={isLoading}>
						{isLoading ? 'Przypisywanie...' : 'Przypisz odpad'}
					</Button>

					<button
						type='button'
						onClick={onCloseModal}
						className='px-4 py-2 rounded hover:bg-gray/10 duration-300 transition'
					>
						Anuluj
					</button>
				</div>
			</form>
		</div>
	);
}
