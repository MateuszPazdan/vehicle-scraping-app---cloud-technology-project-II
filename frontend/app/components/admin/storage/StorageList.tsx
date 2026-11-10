'use client';

import { useRetrieveStoragesQuery } from '@/app/_redux/features/storageApiSlice';
import Spinner from '../../Spinner';
import Modal from '../../Modal';
import EditStorageModal from './EditStorageModal';

export default function StorageList() {
	const { data: storages, isLoading } = useRetrieveStoragesQuery();

	if (isLoading) {
		return (
			<div className=' py-10 flex flex-col items-center justify-center gap-4'>
				<Spinner size='medium' />
				<p className='text-'>Ładowanie odpadów...</p>
			</div>
		);
	}

	return (
		<div className='px-2'>
			{storages?.length ? (
				<>
					<table className='min-w-full rounded-md overflow-hidden'>
						<thead className='bg-main text-white'>
							<tr className='text-left'>
								<th className='px-4 py-2'>Nazwa magazynu</th>
								<th className='px-4 py-2'>Nazwa odpadu</th>
								<th className='px-4 py-2'>Aktualne zapełnienie (kg)</th>
								<th className='px-4 py-2'>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{storages?.map((storage) => (
								<tr
									key={storage.id}
									className='border-t border-gray-200 text-base'
								>
									<td className='px-4 py-2'>{storage?.locationNr}</td>
									<td className='px-4 py-2'>{storage?.wasteType?.name}</td>
									<td className='px-4 py-2'>
										{storage?.currentMass >= 0 && '\u00A0'}
										{storage?.currentMass.toFixed(2)}
									</td>
									<td className='px-4 py-2'>
										<Modal>
											<Modal.Open opens={`editStorage${storage.id}`}>
												<button className='text-main hover:text-mainHover font-medium transition-colors duration-300'>
													Edytuj magazyn
												</button>
											</Modal.Open>
											<Modal.Window name={`editStorage${storage.id}`}>
												<EditStorageModal
													onCloseModal={() => undefined}
													storage={storage}
												/>
											</Modal.Window>
										</Modal>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p className='text-center text-gray-500'>
					Brak odpadów do wyświetlenia.
				</p>
			)}
		</div>
	);
}
