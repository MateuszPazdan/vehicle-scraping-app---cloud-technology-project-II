'use client';

import { Climate_Crisis } from 'next/font/google';

const climate_crisit = Climate_Crisis({
	subsets: ['latin'],
	weight: ['400'],
});

function HelloHeader() {
	return (
		<div className='overflow-y-auto p-2 md:p-10 py-5'>
			<p className='text-center flex flex-col justify-center'>
				<span className={`${climate_crisit.className} text-5xl text-main`}>
					VS App
				</span>

				<span className='text-xl'>Panel administracyjny</span>
			</p>
		</div>
	);
}

export default HelloHeader;
