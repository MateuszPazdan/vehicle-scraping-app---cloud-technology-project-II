import {
	Storage,
	useRetrieveStoragesQuery,
} from '@/app/_redux/features/storageApiSlice';
import { useState } from 'react';
import { BsX } from 'react-icons/bs';

interface ChooseStorageProps {
	storage: Storage | null;
	setStorage: (storage: Storage | null) => void;
}

export default function ChooseStorage({
	storage,
	setStorage,
}: ChooseStorageProps) {
	const { data: storages } = useRetrieveStoragesQuery();
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	function handleRemoveStorage() {
		setStorage(null);
	}

	function handleAddStorage(storage: Storage) {
		setStorage(storage);
		setSearchValue('');
	}

	const storagesToDisplay = storages?.filter((storage) =>
		storage.locationNr.toLowerCase().startsWith(searchValue.toLowerCase())
	);

	return (
		<div className='flex flex-col relative'>
			<p className='text-sm text-gray mb-1'>Nazwa magazynu</p>

			{storage ? (
				<div className='flex flex-col gap-1 mb-2'>
					<div className='flex flex-row justify-between items-center px-3 py-2 border border-gray/10 rounded-lg'>
						<p>
							<span>{storage?.locationNr}</span> -{' '}
							<span>{storage?.wasteType.name}</span> -{' '}
							<span>{storage.currentMass} kg</span>
						</p>
						<button
							type='button'
							onClick={() => handleRemoveStorage()}
							className='text-2xl p-2 hover:text-red-500 hover:bg-gray/10 rounded duration-300 transition'
						>
							<BsX />
						</button>
					</div>
				</div>
			) : (
				<>
					<input
						type='text'
						className='border border-gray/30 rounded-lg px-3 py-2'
						placeholder='Podaj nazwę magazynu'
						value={searchValue}
						onChange={(e) => setSearchValue(e.currentTarget.value)}
						onFocus={() => setIsDropdownVisible(true)}
						onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
					/>

					{storagesToDisplay && (
						<ul
							className={`absolute ${
								!isDropdownVisible ? 'hidden' : 'block'
							} top-full mt-1 bg-white border border-gray/30 rounded rounded-r-none w-full z-10 max-h-[200px] overflow-y-auto`}
						>
							{storagesToDisplay.map((storage) => (
								<li
									key={storage.id}
									className='px-3 py-2 hover:bg-gray/10 cursor-pointer'
									onClick={() => handleAddStorage(storage)}
								>
									<span>{storage?.locationNr}</span> -{' '}
									<span>{storage?.wasteType.name}</span>
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</div>
	);
}
