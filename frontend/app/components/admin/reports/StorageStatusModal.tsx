import ModalHeader from '../../ModalHeader';
import Button from '../../Button';
import { useGenerateStorageStatusReportMutation } from '@/app/_redux/features/reportApiSlice';
import { toast } from 'react-toastify';

export default function StorageStatusModal({
	onCloseModal,
}: {
	onCloseModal: () => void;
}) {
	const [generateStorageStatusReport] =
		useGenerateStorageStatusReportMutation();
	async function generatePDF() {
		generateStorageStatusReport({})
			.unwrap()
			.then(() => {
				onCloseModal();
				toast.success('Wygenerowano stan magazynowy');
			})
			.catch((error) => {
				toast.error(error.message ?? 'Wystąpił błąd przy generowaniu raportu');
				console.log(error);
			});
	}

	return (
		<div className='flex flex-col gap-5'>
			<ModalHeader title='Stan magazynowy' onCloseModal={onCloseModal} />
			<p>
				Zostanie stworzony dla ciebie raport zawierający aktualny stan
				magazynowy każdego odpadu.
			</p>
			<div className='self-end'>
				<Button type='button' onClick={generatePDF}>
					Generuj raport
				</Button>
			</div>
		</div>
	);
}
