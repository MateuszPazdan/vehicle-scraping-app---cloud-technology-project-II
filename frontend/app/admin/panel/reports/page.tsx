import ReportsGenerator from '@/app/components/admin/reports/ReportsGenerator';

export default function page() {
	return (
		<div className='px-2'>
			<div className='flex flex-row justify-between items-center px-6'>
				<p className='text-3xl font-bold py-10 text-center'>
					Generowanie raportów
				</p>
			</div>
			<ReportsGenerator />
		</div>
	);
}
