import AddVehicleElement from '@/app/components/admin/vehicles/AddVehicleElement';
import VehicleFilters from '@/app/components/admin/vehicles/VehicleFIlters';
import VehicleList from '@/app/components/admin/vehicles/VehicleList';

export default function page() {
	return (
		<div className='px-2'>
			<div className='flex flex-row justify-between items-center px-6'>
				<p className='text-3xl font-bold py-10 text-center'>Lista pojazdów</p>
				<AddVehicleElement />
			</div>
			<VehicleFilters />
			<VehicleList />
		</div>
	);
}
