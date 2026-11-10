import {
	Owner,
	useRetrieveOwnersQuery,
} from '@/app/_redux/features/ownerApiSlice';
import { useState } from 'react';
import { BsX } from 'react-icons/bs';

interface ChooseVehicleOwnersProps {
	choosenOwners: Owner[];
	setChoosenOwners: (owners: Owner[]) => void;
}

export default function ChooseVehicleOwners({
	choosenOwners,
	setChoosenOwners,
}: ChooseVehicleOwnersProps) {
	const [searchValue, setSearchValue] = useState<string>('');
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

	const { data: owners } = useRetrieveOwnersQuery({ pesel: searchValue });

	const handleAddOwner = (owner: Owner) => {
		if (!choosenOwners.find((o) => o.id === owner.id)) {
			setChoosenOwners([...choosenOwners, owner]);
		}
		setSearchValue('');
		setIsDropdownVisible(false);
	};

	const handleRemoveOwner = (owner: Owner) => {
		setChoosenOwners(choosenOwners.filter((o) => o.id !== owner.id));
	};

	const ownersToDisplay = owners?.filter((owner) => {
		return !choosenOwners.some((o) => o.id === owner.id);
	});

	return (
		<div className='flex flex-col relative'>
			<p className='text-sm text-gray mb-1'>Właściciele</p>

			{choosenOwners.length > 0 ? (
				<div className='flex flex-col gap-1 mb-2'>
					{choosenOwners.map((owner) => (
						<div
							key={owner.id}
							className='flex flex-row justify-between items-center px-3 py-2 border border-gray/10 rounded-lg'
						>
							<p>
								<span>{owner.name}</span> <span>{owner.surname}</span> —{' '}
								<span> {owner.pesel}</span>
							</p>
							<button
								type='button'
								onClick={() => handleRemoveOwner(owner)}
								className='text-2xl p-2 hover:text-red-500 hover:bg-gray/10 rounded duration-300 transition'
							>
								<BsX />
							</button>
						</div>
					))}
				</div>
			) : (
				<p className='text-gray/50 text-sm mb-2'>Brak wybranych właścicieli</p>
			)}

			<input
				type='text'
				className='border border-gray/30 rounded-lg px-3 py-2'
				placeholder='Podaj PESEL szukanego właściciela'
				value={searchValue}
				onChange={(e) => setSearchValue(e.currentTarget.value)}
				onFocus={() => setIsDropdownVisible(true)}
				onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
			/>

			{ownersToDisplay && searchValue.length >= 2 && (
				<ul
					className={`absolute ${
						!isDropdownVisible ? 'hidden' : 'block'
					} top-full mt-1 bg-white border border-gray/30 rounded rounded-r-none w-full z-10 max-h-28 overflow-y-auto`}
				>
					{ownersToDisplay.map((owner) => (
						<li
							key={owner.id}
							className='px-3 py-2 hover:bg-gray/10 cursor-pointer'
							onClick={() => handleAddOwner(owner)}
						>
							{owner.name} {owner.surname} — {owner.pesel}
						</li>
					))}
					{/* <li>
						<Modal>
							<Modal.Open opens='addOwner'>
								<button
									type='button'
									className='flex justify-center items-center gap-2 px-3 py-2 w-full hover:bg-gray/10'
								>
									<span className='text-green-500 text-2xl'>+</span>{' '}
									<span>Dodaj właściciela</span>
								</button>
							</Modal.Open>
							<Modal.Window name='addOwner'>
								<AddOwnerModal onCloseModal={() => undefined} />
							</Modal.Window>
						</Modal>
					</li> */}
				</ul>
			)}
		</div>
	);
}
