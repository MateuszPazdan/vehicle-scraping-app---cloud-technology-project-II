import {
	StorageBody,
	useCreateStorageMutation,
	useRetrieveStoragesQuery,
} from '@/app/_redux/features/storageApiSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ModalHeader from '../../ModalHeader';
import Button from '../../Button';
import ChooseWasteType from './ChooseWasteType';
import { useState } from 'react';
import { Waste } from '@/app/_redux/features/wasteApiSlice';

export default function AddStorageModal({
	onCloseModal,
}: {
	onCloseModal: () => void;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StorageBody>();
	const [wasteType, setWasteType] = useState<Waste | null>(null);
	const [createStorage, { isLoading: isLoadingStorage }] =
		useCreateStorageMutation();
	const { refetch: refetchStorages } = useRetrieveStoragesQuery();

	const onSubmit = async (data: StorageBody) => {
		if (!wasteType) {
			toast.error('Wybierz typ odpadu!');
			return;
		}
		createStorage({
			...data,
			wasteTypeId: wasteType?.id || 0,
		})
			.unwrap()
			.then(() => {
				toast.success('Magazyn został dodany!');
				refetchStorages();
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error.data?.message || 'Wystąpił błąd podczas dodawania magazynu!'
				);
				console.error('Error creating storage:', error);
			});
	};
	return (
		<div className='py-2'>
			<ModalHeader onCloseModal={onCloseModal} title='Dodaj magazyn' />
			<form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Nazwa magazynu</label>
					<input
						type='text'
						placeholder='Nazwa magazynu'
						{...register('locationNr', { required: 'Podaj nazwę magazynu' })}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>
						{errors.locationNr?.message}
					</p>
				</div>
				<ChooseWasteType wasteType={wasteType} setWasteType={setWasteType} />

				<div className='flex justify-end gap-4 pt-8'>
					<Button type='submit' disabled={isLoadingStorage}>
						{isLoadingStorage ? 'Dodawanie...' : 'Dodaj magazyn'}
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
