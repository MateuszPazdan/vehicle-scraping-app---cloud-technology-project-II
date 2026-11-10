import {
	useDismantleVehicleMutation,
	useRetrieveVehicleQuery,
} from '@/app/_redux/features/vehicleApiSlice';
import Button from '../../Button';
import ModalHeader from '../../ModalHeader';
import { toast } from 'react-toastify';

export default function VehicleDismantlingModal({
	onCloseModal,
	vehicleId,
}: {
	vehicleId: number;
	onCloseModal: () => void;
}) {
	const [dismantleVehicle, { isLoading }] = useDismantleVehicleMutation();
	const { refetch } = useRetrieveVehicleQuery(vehicleId);
	function handleDismantleVehicle() {
		dismantleVehicle(vehicleId)
			.unwrap()
			.then(() => {
				toast.success('Pojazd został zdemontowany!');
				onCloseModal();
				refetch();
			})
			.catch((error) => {
				toast.error(
					error.data?.message || 'Wystąpił błąd podczas demontażu pojazdu!'
				);
				console.error('Error dismantling vehicle:', error);
			});
	}

	return (
		<div className='flex flex-col items-center p-2 gap-5'>
			<ModalHeader onCloseModal={onCloseModal} title='Zmiana statusu pojazdu' />
			<p className='text-gray/90 py-6 text-center'>
				Czy jesteś pewny, że chcesz zmienić status pojazdu na
				&apos;zdemontowany&apos;?
			</p>
			<div className='space-x-2'>
				<Button
					isLoading={isLoading}
					onClick={handleDismantleVehicle}
					type='button'
				>
					Demontuj pojazd
				</Button>
			</div>
		</div>
	);
}
