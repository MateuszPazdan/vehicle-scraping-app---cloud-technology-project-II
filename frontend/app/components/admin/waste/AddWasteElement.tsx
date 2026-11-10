'use client';

import Button from '../../Button';
import Modal from '../../Modal';
import AddWasteModal from './AddWasteModal';

export default function AddWasteElement() {
	return (
		<Modal>
			<Modal.Open opens='addStorage'>
				<Button type='button'>Dodaj odpad</Button>
			</Modal.Open>
			<Modal.Window name='addStorage'>
				<AddWasteModal onCloseModal={() => undefined} />
			</Modal.Window>
		</Modal>
	);
}
