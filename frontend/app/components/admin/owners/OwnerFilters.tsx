'use client';

import { OwnerFilters as OwnerFiltersParams } from '@/app/_redux/features/ownerApiSlice';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../../Button';

export default function OwnerFilters() {
	const { register, handleSubmit, reset } = useForm<OwnerFiltersParams>();
	const router = useRouter();
	const searchParams = useSearchParams();

	const onSubmit = (data: OwnerFiltersParams) => {
		const query = new URLSearchParams();

		Object.entries(data).forEach(([key, value]) => {
			if (value && value.trim() !== '') {
				query.set(key, value);
			}
		});

		router.push(`?${query.toString()}`);
	};

	const handleClear = () => {
		reset();
		router.push('?');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
			<div className='grid grid-cols-3 gap-4 px-6'>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Imię</label>
					<input
						type='text'
						placeholder='Imię'
						{...register('name')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('name') || ''}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Nazwisko</label>
					<input
						type='text'
						placeholder='Nazwisko'
						{...register('surname')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('surname') || ''}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>PESEL</label>
					<input
						type='text'
						placeholder='PESEL'
						{...register('pesel')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('pesel') || ''}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Adres</label>
					<input
						type='text'
						placeholder='Adres'
						{...register('address')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('address') || ''}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='text-sm text-gray mb-1'>Numer dowodu</label>
					<input
						type='text'
						placeholder='Numer dowodu'
						{...register('id_number')}
						className='border border-gray/30 rounded-lg px-3 py-2 w-full '
						defaultValue={searchParams.get('id_number') || ''}
					/>
				</div>
			</div>
			<div className='flex gap-4 px-6 self-end mt-4'>
				<Button type='submit'>Filtruj</Button>
				<button
					type='button'
					className='bg-gray-200 px-4 py-2 rounded hover:bg-gray/10 duration-300 transition'
					onClick={() => handleClear()}
				>
					Wyczyść
				</button>
			</div>
		</form>
	);
}
