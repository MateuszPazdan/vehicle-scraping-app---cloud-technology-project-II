'use client';

import { useRetrieveVehiclesQuery } from '@/app/_redux/features/vehicleApiSlice';
import Spinner from '../../Spinner';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VehicleList() {
	const searchParams = useSearchParams();
	const { data: vehicles, isLoading } = useRetrieveVehiclesQuery({
		brand: searchParams.get('brand') || '',
		model: searchParams.get('model') || '',
		vin: searchParams.get('vin') || '',
		year_of_production:
			Number(searchParams.get('year_of_production')) || undefined,
		registration_number: searchParams.get('registration_number') || '',
		vehicle_status: searchParams.get('vehicle_status') || undefined,
		owner_pesel: searchParams.get('owner_pesel') || undefined,
	});
	const router = useRouter();

	return (
		<div className='mx-auto p-6'>
			{isLoading ? (
				<div className='py-10'>
					<Spinner size='medium' />
				</div>
			) : vehicles?.length ? (
				<>
					<table className='min-w-full rounded-md overflow-hidden'>
						<thead className='bg-main text-white'>
							<tr className='text-left'>
								<th className='px-4 py-2'>Marka</th>
								<th className='px-4 py-2'>Model</th>
								<th className='px-4 py-2'>Rok produkcji</th>
								<th className='px-4 py-2'>VIN</th>
								<th className='px-4 py-2'>Nr rej.</th>
								<th className='px-4 py-2'>Waga (kg)</th>
								<th className='px-4 py-2'>Status</th>
								<th className='px-4 py-2'>Cena (zł)</th>
							</tr>
						</thead>
						<tbody>
							{vehicles.map((vehicle) => (
								<tr
									key={vehicle.id}
									onClick={() =>
										router.push(`/admin/panel/vehicles/${vehicle.id}`)
									}
									className='border-t border-gray-200 hover:bg-mainHover hover:text-white transition-colors cursor-pointer text-base'
								>
									<td className='px-4 py-2'>{vehicle.brand}</td>
									<td className='px-4 py-2'>{vehicle.model}</td>
									<td className='px-4 py-2'>{vehicle.year_of_production}</td>
									<td className='px-4 py-2'>{vehicle.vin}</td>
									<td className='px-4 py-2'>{vehicle.registration_number}</td>
									<td className='px-4 py-2'>{vehicle.weight}</td>
									<td className='px-4 py-2'>
										{vehicle.status === 'RECEIVED_FOR_DISMANTLING'
											? 'Przyjęty'
											: 'Zdemontowany'}
									</td>
									<td className='px-4 py-2'>{vehicle.price}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				<p className='text-center text-gray-500'>
					Brak pojazdów do wyświetlenia.
				</p>
			)}
		</div>
	);
}
