'use client';

import Button from '../../Button';
import Modal from '../../Modal';
import AddStorageModal from './AddStorageModal';

export default function AddStorageElement() {
	return (
		<Modal>
			<Modal.Open opens='addVehicle'>
				<Button type='button'>Dodaj magazyn</Button>
			</Modal.Open>
			<Modal.Window name='addVehicle'>
				<AddStorageModal onCloseModal={() => undefined} />
			</Modal.Window>
		</Modal>
	);
}
