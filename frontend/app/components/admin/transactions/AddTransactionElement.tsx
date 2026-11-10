'use client';

import Button from '../../Button';
import Modal from '../../Modal';
import AddTransactionModal from './AddTransactionModal';

export default function AddTransactionElement() {
	return (
		<Modal>
			<Modal.Open opens='addTransaction'>
				<Button type='button'>Dodaj transakcję</Button>
			</Modal.Open>
			<Modal.Window name='addTransaction'>
				<AddTransactionModal onCloseModal={() => undefined} />
			</Modal.Window>
		</Modal>
	);
}
