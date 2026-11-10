import {
	TransactionBody,
	useCreateTransactionMutation,
	useRetrieveTransactionsQuery,
} from '@/app/_redux/features/transactionApiSlice';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
	Storage,
	useRetrieveStoragesQuery,
} from '@/app/_redux/features/storageApiSlice';
import ModalHeader from '../../ModalHeader';
import ChooseStorage from '../storage/ChooseStorage';
import Button from '../../Button';

export default function AddTransactionModal({
	onCloseModal,
}: {
	onCloseModal: () => void;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TransactionBody>();
	const [createTransaction, { isLoading: isLoadingTransaction }] =
		useCreateTransactionMutation();
	const { refetch: refetchTransactions } = useRetrieveTransactionsQuery();
	const { refetch: refetchStorages } = useRetrieveStoragesQuery();
	const [storage, setStorage] = useState<Storage | null>(null);

	const onSubmit = async (data: TransactionBody) => {
		if (!storage) {
			toast.error('Wybierz magazyn');
			return;
		}
		createTransaction({
			...data,
			storageLocationId: storage.id,
		})
			.unwrap()
			.then(() => {
				toast.success('Transakcja została dodana!');
				refetchTransactions();
				refetchStorages();
				onCloseModal();
			})
			.catch((error) => {
				toast.error(
					error.data?.message || 'Wystąpił błąd podczas dodawania transakcji!'
				);
				console.error('Error creating transaction:', error);
			});
	};
	return (
		<div className='py-2'>
			<ModalHeader onCloseModal={onCloseModal} title='Dodaj transakcję' />
			<form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
				<ChooseStorage setStorage={setStorage} storage={storage} />
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>
						Wartość transakcji (PLN)
					</label>
					<input
						type='number'
						placeholder='Wartość transakcji'
						{...register('totalPrice', {
							required: 'Podaj wartość transakcji',
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>
						{errors.totalPrice?.message}
					</p>
				</div>

				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Ilość odpadu (kg)</label>
					<input
						type='number'
						placeholder='Ilość odpadu'
						{...register('weight', {
							required: 'Podaj ilość odpadu',
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.weight?.message}</p>
				</div>

				<div className='flex justify-end gap-4 pt-8'>
					<Button type='submit' isLoading={isLoadingTransaction}>
						{isLoadingTransaction ? 'Tworzenie...' : 'Utwórz transakcję'}
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
