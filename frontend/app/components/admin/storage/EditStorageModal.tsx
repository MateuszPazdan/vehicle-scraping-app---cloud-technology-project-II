import {
	Storage,
	StorageEditBody,
	useEditStorageMutation,
	useRetrieveStoragesQuery,
} from '@/app/_redux/features/storageApiSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ModalHeader from '../../ModalHeader';
import Button from '../../Button';

export default function EditStorageModal({
	onCloseModal,
	storage,
}: {
	onCloseModal: () => void;
	storage: Storage;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StorageEditBody>({
		defaultValues: {
			locationNr: storage.locationNr,
		},
	});
	const [updateStorage, { isLoading }] = useEditStorageMutation();
	const { refetch: refetchStorages } = useRetrieveStoragesQuery();

	const onSubmit = async (data: StorageEditBody) => {
		updateStorage({ id: storage?.id, ...data })
			.unwrap()
			.then(() => {
				toast.success('Magazyn został zaktualizowany!');
				refetchStorages();
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error.data?.message || 'Wystąpił błąd podczas edycji odpadu!'
				);
				console.error('Error updating waste:', error);
			});
	};

	return (
		<div className=''>
			<ModalHeader onCloseModal={onCloseModal} title='Edycja magazynu' />
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

				<div className='flex justify-end gap-4 pt-8'>
					<Button type='submit' disabled={isLoading}>
						{isLoading ? 'Aktualizowanie...' : 'Zapisz zmiany'}
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
