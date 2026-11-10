'use client';

import Button from '../../Button';
import Modal from '../../Modal';
import AddOwnerModal from './AddOwnerModal';

export default function AddOwnerElement() {
	return (
		<Modal>
			<Modal.Open opens='addVehicle'>
				<Button type='button'>Dodaj właściciela</Button>
			</Modal.Open>
			<Modal.Window name='addVehicle'>
				<AddOwnerModal onCloseModal={() => undefined} />
			</Modal.Window>
		</Modal>
	);
}
