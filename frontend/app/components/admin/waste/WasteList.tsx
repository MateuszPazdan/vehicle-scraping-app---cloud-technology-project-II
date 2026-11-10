'use client';

import { useRetrieveWastesQuery } from '@/app/_redux/features/wasteApiSlice';
import Spinner from '../../Spinner';
import Modal from '../../Modal';
import EditWasteModal from './EditWasteModal';

export default function WasteList() {
	const { data: wastes, isLoading } = useRetrieveWastesQuery();

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
			{wastes?.length ? (
				<>
					<table className='min-w-full rounded-md overflow-hidden'>
						<thead className='bg-main text-white'>
							<tr className='text-left'>
								<th className='px-4 py-2'>Nazwa odapdu</th>
								<th className='px-4 py-2'>Cena odpadu (zł/kg)</th>
								<th className='px-4 py-2'>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{wastes?.map((waste) => (
								<tr
									key={waste.id}
									className='border-t border-gray-200 text-base'
								>
									<td className='px-4 py-2'>{waste?.name}</td>
									<td className='px-4 py-2'>
										{waste?.pricePerKg >= 0 && '\u00A0'}
										{waste?.pricePerKg.toFixed(2)}
									</td>
									<td className='px-4 py-2'>
										<Modal>
											<Modal.Open opens={`editWaste${waste.id}`}>
												<button className='text-main hover:text-mainHover font-medium transition-colors duration-300'>
													Edytuj odpad
												</button>
											</Modal.Open>
											<Modal.Window name={`editWaste${waste.id}`}>
												<EditWasteModal
													onCloseModal={() => undefined}
													waste={waste}
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
