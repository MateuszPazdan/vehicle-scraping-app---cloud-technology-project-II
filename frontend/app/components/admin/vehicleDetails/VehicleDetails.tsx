'use client';

import { useRetrieveVehicleQuery } from '@/app/_redux/features/vehicleApiSlice';
import Spinner from '../../Spinner';
import Modal from '../../Modal';
import VehicleDismantlingModal from './VehicleDismantlingModal';
import VehicleDismantlingCertificateModal from './VehicleDismantlingCertificateModal';
import AssignedWastes from './AssignedWastes';

interface VehicleDetailsProps {
	vehicleId: number;
}

export default function VehicleDetails({ vehicleId }: VehicleDetailsProps) {
	const { data: vehicle, isLoading } = useRetrieveVehicleQuery(vehicleId);

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

	function formatStatus(status: string | undefined) {
		switch (status) {
			case 'RECEIVED_FOR_DISMANTLING':
				return 'Oczekujący na demontaż';
			case 'DISMANTLED':
				return 'Zdemontowany';
			default:
				return status;
		}
	}

	if (isLoading) {
		return (
			<div className='min-h-screen flex flex-col items-center justify-center gap-4'>
				<Spinner size='medium' />
				<p className='text-'>Ładowanie danych o pojeździe...</p>
			</div>
		);
	}

	return (
		<div className=''>
			<div className='flex justify-between items-center pb-8'>
				<p className='text-3xl font-semibold'>Dane pojazdu</p>
				<div className='space-x-2'>
					{vehicle?.status === 'RECEIVED_FOR_DISMANTLING' && (
						<Modal>
							<Modal.Open opens='vehicle_status'>
								<button className='bg-main hover:bg-mainHover text-white font-medium py-2 px-4 rounded-lg transition-colors'>
									Demontuj pojazd
								</button>
							</Modal.Open>
							<Modal.Window name='vehicle_status'>
								<VehicleDismantlingModal
									vehicleId={vehicleId}
									onCloseModal={() => undefined}
								/>
							</Modal.Window>
						</Modal>
					)}
					<Modal>
						<Modal.Open opens='vehicle_status'>
							<button className='bg-main hover:bg-mainHover text-white font-medium py-2 px-4 rounded-lg transition-colors'>
								Wystaw zaświadczenie
							</button>
						</Modal.Open>
						<Modal.Window name='vehicle_status'>
							<VehicleDismantlingCertificateModal
								onCloseModal={() => undefined}
							/>
						</Modal.Window>
					</Modal>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-4 mb-6'>
				<Info label='Marka' value={vehicle?.brand} />
				<Info label='Model' value={vehicle?.model} />
				<Info label='Rok produkcji' value={vehicle?.year_of_production} />
				<Info label='VIN' value={vehicle?.vin} />
				<Info label='Nr rejestracyjny' value={vehicle?.registration_number} />
				<Info
					label='Nr dowodu rej.'
					value={vehicle?.registration_certificate_number}
				/>
				<Info label='Waga' value={`${vehicle?.weight} kg`} />
				<Info label='Status' value={formatStatus(vehicle?.status)} />
				<Info label='Data przyjęcia' value={formatDate(vehicle?.receivedAt)} />
				<Info
					label='Data demontażu'
					value={formatDate(vehicle?.dismantledAt)}
				/>
				<Info label='Wartość przyjęcia' value={`${vehicle?.price} zł`} />
			</div>

			<p className='text-3xl font-semibold py-8'>Właściciele pojazdu</p>
			<table className='min-w-full rounded-md overflow-hidden'>
				<thead className='bg-main text-white'>
					<tr className='text-left'>
						<th className='px-4 py-2'>Imię</th>
						<th className='px-4 py-2'>Nazwisko</th>
						<th className='px-4 py-2'>PESEL</th>
						<th className='px-4 py-2'>Adres</th>
						<th className='px-4 py-2'>Numer dowodu</th>
					</tr>
				</thead>
				<tbody>
					{vehicle?.owners.map((owner) => (
						<tr
							key={owner.id}
							className='border-t border-gray-200 transition-colors text-base'
						>
							<td className='px-4 py-2'>{owner.name}</td>
							<td className='px-4 py-2'>{owner.surname}</td>
							<td className='px-4 py-2'>{owner.pesel}</td>
							<td className='px-4 py-2'>{owner.address}</td>
							<td className='px-4 py-2'>{owner.id_number}</td>
						</tr>
					))}
				</tbody>
			</table>
			<AssignedWastes vehicle={vehicle} />
		</div>
	);
}

function Info({
	label,
	value,
}: {
	label: string;
	value: string | number | undefined | null;
}) {
	return (
		<div>
			<p className='text-sm text-gray/80'>{label}</p>
			<p className='font-semibold'>{value}</p>
		</div>
	);
}
