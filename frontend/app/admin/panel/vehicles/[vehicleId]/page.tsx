import VehicleDetails from '@/app/components/admin/vehicleDetails/VehicleDetails';

interface Params {
	vehicleId: string;
}

export default async function page({ params }: { params: Promise<Params> }) {
	const { vehicleId } = await params;
	return (
		<div className='px-8 py-10'>
			<VehicleDetails vehicleId={Number(vehicleId)} />
		</div>
	);
}
