'use client';

import Button from '../../Button';
import Modal from '../../Modal';
import AddVehicleModal from './AddVehicleModal';

export default function AddVehicleElement() {
	return (
		<Modal>
			<Modal.Open opens='addVehicle'>
				<Button type='button'>Dodaj pojazd</Button>
			</Modal.Open>
			<Modal.Window name='addVehicle'>
				<AddVehicleModal onCloseModal={() => undefined} />
			</Modal.Window>
		</Modal>
	);
}
