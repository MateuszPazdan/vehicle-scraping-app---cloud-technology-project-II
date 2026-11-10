'use client';

import Modal from '../../Modal';
import Button from '../../Button';
import StorageStatusModal from './StorageStatusModal';

export default function ReportsGenerator() {
	return (
		<div className='px-6'>
			<div className='flex flex-row justify-between items-center border-b-[1px] border-main py-6'>
				<p className='text-xl'>Stan magazynowy</p>
				<Modal>
					<Modal.Open opens='storageStatus'>
						<Button type='button'>Generuj</Button>
					</Modal.Open>
					<Modal.Window name='storageStatus'>
						<StorageStatusModal onCloseModal={() => undefined} />
					</Modal.Window>
				</Modal>
			</div>
			<div className='flex flex-row justify-between items-center border-b-[1px] border-main py-6'>
				<p className='text-xl'>Przyjęte pojazdy</p>
				<Modal>
					<Modal.Open opens='receivedVehicles'>
						<Button type='button'>Generuj</Button>
					</Modal.Open>
					<Modal.Window name='receivedVehicles'>
						<div>2</div>
					</Modal.Window>
				</Modal>
			</div>
			<div className='flex flex-row justify-between items-center py-6'>
				<p className='text-xl'>Wytworzone odpady</p>
				<Modal>
					<Modal.Open opens='producedWastes'>
						<Button type='button'>Generuj</Button>
					</Modal.Open>
					<Modal.Window name='producedWastes'>
						<div>3</div>
					</Modal.Window>
				</Modal>
			</div>
		</div>
	);
}
