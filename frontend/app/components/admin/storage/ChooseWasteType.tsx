import {
	useRetrieveWastesQuery,
	Waste,
} from '@/app/_redux/features/wasteApiSlice';
import { useState } from 'react';
import { BsX } from 'react-icons/bs';

interface ChooseWasteTypeProps {
	wasteType: Waste | null;
	setWasteType: (wasteType: Waste | null) => void;
}

export default function ChooseWasteType({
	wasteType,
	setWasteType,
}: ChooseWasteTypeProps) {
	const { data: wastes } = useRetrieveWastesQuery();
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	function handleRemoveWasteType() {
		setWasteType(null);
	}

	function handleAddWasteType(waste: Waste) {
		setWasteType(waste);
		setSearchValue('');
	}

	const wastesTypesToDisplay = wastes?.filter((waste) =>
		waste.name.toLowerCase().startsWith(searchValue.toLowerCase())
	);

	return (
		<div className='flex flex-col relative'>
			<p className='text-sm text-gray mb-1'>Typ odpadu</p>

			{wasteType ? (
				<div className='flex flex-col gap-1 mb-2'>
					<div className='flex flex-row justify-between items-center px-3 py-2 border border-gray/10 rounded-lg'>
						<p>{wasteType.name}</p>
						<button
							type='button'
							onClick={() => handleRemoveWasteType()}
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
						placeholder='Podaj nazwę odpadu'
						value={searchValue}
						onChange={(e) => setSearchValue(e.currentTarget.value)}
						onFocus={() => setIsDropdownVisible(true)}
						onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
					/>

					{wastesTypesToDisplay && (
						<ul
							className={`absolute ${
								!isDropdownVisible ? 'hidden' : 'block'
							} top-full mt-1 bg-white border border-gray/30 rounded rounded-r-none w-full z-10 max-h-28 overflow-y-auto`}
						>
							{wastesTypesToDisplay.map((waste) => (
								<li
									key={waste.id}
									className='px-3 py-2 hover:bg-gray/10 cursor-pointer'
									onClick={() => handleAddWasteType(waste)}
								>
									{waste?.name}
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</div>
	);
}
