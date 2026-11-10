import ModalHeader from '../../ModalHeader';

export default function VehicleDismantlingCertificateModal({
	onCloseModal,
}: {
	onCloseModal: () => void;
}) {
	return (
		<div className='flex flex-col p-2 gap-5'>
			<ModalHeader
				onCloseModal={onCloseModal}
				title='Zaświadczenie o demontażu pojazdu'
			></ModalHeader>
		</div>
	);
}
