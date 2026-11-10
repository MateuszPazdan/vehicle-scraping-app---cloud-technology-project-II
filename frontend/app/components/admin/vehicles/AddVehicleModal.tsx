import ModalHeader from '../../ModalHeader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../../Button';
import {
	useCreateVehicleMutation,
	useRetrieveVehiclesQuery,
	VehicleBody,
} from '@/app/_redux/features/vehicleApiSlice';
import ChooseVehicleOwners from './ChooseVehicleOwners';
import { Owner } from '@/app/_redux/features/ownerApiSlice';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface AddVehicleModalProps {
	onCloseModal: () => void;
}

export default function AddVehicleModal({
	onCloseModal,
}: AddVehicleModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<VehicleBody>();
	const [createVehicle, { isLoading: isVehicleCreating }] =
		useCreateVehicleMutation();
	const [owners, setOwners] = useState<Owner[]>([]);
	const searchParams = useSearchParams();
	const { refetch: refetchVehicles } = useRetrieveVehiclesQuery({
		brand: searchParams.get('brand') || '',
		model: searchParams.get('model') || '',
		vin: searchParams.get('vin') || '',
		year_of_production:
			Number(searchParams.get('year_of_production')) || undefined,
		registration_number: searchParams.get('registration_number') || '',
		vehicle_status: searchParams.get('vehicle_status') || undefined,
		owner_pesel: searchParams.get('owner_pesel') || undefined,
	});

	const onSubmit = async (data: VehicleBody) => {
		console.log(data.price, data.weight, data.year_of_production);
		createVehicle({ ...data, owners: owners.map((owner) => owner.pesel) })
			.unwrap()
			.then(() => {
				toast.success('Pojazd został dodany!');
				refetchVehicles();
				onCloseModal();
			})
			.catch((error) => {
				// console.log(error);
				toast.error(
					error.data.message || 'Wystąpił błąd podczas dodawania pojazdu!'
				);
			});
	};
	return (
		<div className='p-6 space-y-10'>
			<ModalHeader onCloseModal={onCloseModal} title='Dodaj pojazd' />
			<form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Marka</label>
					<input
						type='text'
						placeholder='Marka pojazdu'
						{...register('brand', { required: 'Podaj markę pojazdu' })}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.brand?.message}</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Model</label>
					<input
						type='text'
						placeholder='Model pojazdu'
						{...register('model', { required: 'Podaj model pojazdu' })}
						className='border border-gray/30 rounded-lg px-3 py-2'
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.model?.message}</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Rok produkcji</label>
					<input
						type='number'
						placeholder='Rok produkcji pojazdu'
						{...register('year_of_production', {
							required: 'Podaj rok produkcji pojazdu',
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
						maxLength={4}
						min={1900}
						max={new Date().getFullYear()}
					/>
					<p className='text-red-500 text-xs pt-1'>
						{errors.year_of_production?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>VIN</label>
					<input
						type='text'
						placeholder='VIN pojazdu'
						{...register('vin', { required: 'Podaj VIN' })}
						className='border border-gray/30 rounded-lg px-3 py-2'
						minLength={11}
						maxLength={11}
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.vin?.message}</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Numer rejestracyjny</label>
					<input
						type='text'
						placeholder='Numer rejestracyjny pojazdu'
						{...register('registration_number', {
							required: 'Podaj numer rejestracyjny pojazdu',
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
						maxLength={8}
					/>
					<p className='text-red-500 text-xs pt-1'>
						{errors.registration_number?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>
						Numer dowodu rejestracyjnego
					</label>
					<input
						type='text'
						placeholder='Numer dowodu rejestracyjnego'
						{...register('registration_certificate_number', {
							required: 'Podaj numer dowodu rejestracyjnego pojazdu',
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
						maxLength={7}
					/>
					<p className='text-red-500 text-xs pt-1'>
						{errors.registration_certificate_number?.message}
					</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Waga (kg)</label>
					<input
						type='number'
						placeholder='Waga pojazdu (kg)'
						{...register('weight', {
							required: 'Podaj wagę pojazdu',
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
						min={0}
						max={99999}
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.weight?.message}</p>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Cena (zł)</label>
					<input
						type='number'
						placeholder='Cena przyjęcia pojazdu (zł)'
						{...register('price', {
							required: 'Podaj cenę pojazdu',
						})}
						className='border border-gray/30 rounded-lg px-3 py-2'
						min={0}
						max={99999}
					/>
					<p className='text-red-500 text-xs pt-1'>{errors.price?.message}</p>
				</div>
				<ChooseVehicleOwners
					choosenOwners={owners}
					setChoosenOwners={setOwners}
				/>
				<div className='flex justify-end gap-4 pt-8'>
					<Button type='submit' disabled={isVehicleCreating}>
						{isVehicleCreating ? 'Dodawanie...' : 'Dodaj pojazd'}
					</Button>

					<button
						type='button'
						onClick={onCloseModal}
						className='px-4 py-2 rounded hover:bg-gray/10 duration-300 transition'
					>
						Anuluj
					</button>
				</div>
			</form>
		</div>
	);
}
