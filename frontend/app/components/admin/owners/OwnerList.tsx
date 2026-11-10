'use client';

import Spinner from '../../Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRetrieveOwnersQuery } from '@/app/_redux/features/ownerApiSlice';

export default function OwnerList() {
	const searchParams = useSearchParams();
	const { data: owners, isLoading } = useRetrieveOwnersQuery({
		name: searchParams.get('name') || '',
		surname: searchParams.get('model') || '',
		pesel: searchParams.get('pesel') || '',
		address: searchParams.get('address') || '',
		id_number: searchParams.get('id_number') || '',
	});
	const router = useRouter();

	return (
		<div className='mx-auto p-6'>
			{isLoading ? (
				<div className='py-10'>
					<Spinner size='medium' />
				</div>
			) : owners?.length ? (
				<>
					<table className='min-w-full rounded-md overflow-hidden'>
						<thead className='bg-main text-white'>
							<tr className='text-left'>
								<th className='px-4 py-2'>Imię</th>
								<th className='px-4 py-2'>Nazwisko</th>
								<th className='px-4 py-2'>PESEL</th>
								<th className='px-4 py-2'>Adres</th>
								<th className='px-4 py-2'>Numer dowodu</th>
								<th className='px-4 py-2'>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{owners.map((owner) => (
								<tr
									key={owner.id}
									className='border-t border-gray-200 transition-colors text-base'
								>
									<td className='px-4 py-2'>{owner.name}</td>
									<td className='px-4 py-2'>{owner.surname}</td>
									<td className='px-4 py-2'>{owner.pesel}</td>
									<td className='px-4 py-2'>{owner.address}</td>
									<td className='px-4 py-2'>{owner.id_number}</td>
									<td className='px-4 py-2'>
										<button
											onClick={() =>
												router.push(
													`${process.env.NEXT_PUBLIC_FRONTEND_URL}/admin/panel/vehicles?owner_pesel=${owner.pesel}`
												)
											}
											className='text-main hover:text-mainHover font-medium transition-colors duration-300'
										>
											Wyświetl pojazdy
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p className='text-center text-gray-500'>
					Brak właścieli do wyświetlenia.
				</p>
			)}
		</div>
	);
}
