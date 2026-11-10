'use client';

import { useRetrieveTransactionsQuery } from '@/app/_redux/features/transactionApiSlice';
import Spinner from '../../Spinner';

export default function TransactionList() {
	const { data: transactions, isLoading } = useRetrieveTransactionsQuery();

	if (isLoading) {
		return (
			<div className=' py-10 flex flex-col items-center justify-center gap-4'>
				<Spinner size='medium' />
				<p className='text-'>Ładowanie transakcji...</p>
			</div>
		);
	}

	function formatDate(dateString: string | undefined | null) {
		if (!dateString) return ' - ';
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		};
		return date.toLocaleDateString('pl-PL', options);
	}

	return (
		<div className='px-2'>
			{transactions?.length ? (
				<>
					<table className='min-w-full rounded-md overflow-hidden'>
						<thead className='bg-main text-white'>
							<tr className='text-left'>
								<th className='px-4 py-2'>Data transakcji</th>
								<th className='px-4 py-2'>Kwota transakcji (PLN)</th>
								<th className='px-4 py-2'>Waga (kg)</th>
								<th className='px-4 py-2'>Nazwa magazynu</th>
								<th className='px-4 py-2'>Typ odpadu</th>
							</tr>
						</thead>
						<tbody>
							{transactions?.map((transaction) => (
								<tr
									key={transaction.id}
									className='border-t border-gray-200 text-base'
								>
									<td className='px-4 py-2'>
										{formatDate(transaction.transactionDate)}
									</td>
									<td className='px-4 py-2'>
										{transaction?.totalPrice >= 0 && '\u00A0'}
										{transaction?.totalPrice.toFixed(2)}
									</td>
									<td className='px-4 py-2'>{transaction.weight.toFixed(2)}</td>
									<td className='px-4 py-2'>
										{transaction.storageLocation.locationNr}
									</td>
									<td className='px-4 py-2'>{transaction.wasteType.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p className='text-center text-gray-500'>
					Brak transakcji do wyświetlenia.
				</p>
			)}
		</div>
	);
}
