import { useRetrieveWasteEntriesByVehicleIdQuery } from '@/app/_redux/features/wasteApiSlice';
import Modal from '../../Modal';
import Button from '../../Button';
import AssignWasteModal from './AssignWasteModal';
import { Vehicle } from '@/app/_redux/features/vehicleApiSlice';

export default function AssignedWastes({
	vehicle,
}: {
	vehicle: Vehicle | undefined;
}) {
	const { data: wastes } = useRetrieveWasteEntriesByVehicleIdQuery(
		vehicle?.id || 0
	);

	const wastesSumOfWeight =
		wastes?.reduce((sum, waste) => sum + waste.weight, 0) ?? 0;

	return (
		<>
			<div className='flex justify-between items-center py-8'>
				<p className='text-3xl font-semibold'>
					Przypisane odpady: {wastesSumOfWeight} kg
				</p>
				<div className='space-x-2'>
					{vehicle?.status === 'RECEIVED_FOR_DISMANTLING' && (
						<Modal>
							<Modal.Open opens='assignWastes'>
								<Button type='button'>Przypisz odpady</Button>
							</Modal.Open>
							<Modal.Window name='assignWastes'>
								<AssignWasteModal
									vehicleId={vehicle.id}
									onCloseModal={() => undefined}
								/>
							</Modal.Window>
						</Modal>
					)}
				</div>
			</div>
			<table className='min-w-full rounded-md overflow-hidden'>
				<thead className='bg-main text-white'>
					<tr className='text-left'>
						<th className='px-4 py-2'>Rodzaj odpadu</th>
						<th className='px-4 py-2'>Numer magazynu</th>
						<th className='px-4 py-2'>Waga (kg)</th>
					</tr>
				</thead>
				<tbody>
					{wastes?.map((waste) => (
						<tr
							key={waste.id}
							className='border-t border-gray-200 transition-colors text-base'
						>
							<td className='px-4 py-2'>{waste.wasteType.name}</td>
							<td className='px-4 py-2'>{waste.storageLocation.locationNr}</td>
							<td className='px-4 py-2'>{waste.weight}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
