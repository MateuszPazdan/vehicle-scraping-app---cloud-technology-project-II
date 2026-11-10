'use client';

import {
	BsClipboard2Data,
	BsColumnsGap,
	BsCurrencyExchange,
	BsPerson,
	BsRecycle,
} from 'react-icons/bs';
import { LiaCarCrashSolid, LiaHomeSolid } from 'react-icons/lia';
import MobileNavElement from './MobileNavElement';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
	const pathname = usePathname();
	return (
		<div className='md:hidden absolute bottom-0 left-0 w-full'>
			<div className='flex flex-row gap-1 justify-around items-center mx-2 my-2 shadow-lg rounded-xl border-[1px] border-gray/10 bg-white'>
				<MobileNavElement
					href='/admin/panel/vehicles'
					icon={<LiaCarCrashSolid />}
					isChoosen={pathname.match('vehicles') ?? false}
				>
					Pojazdy
				</MobileNavElement>
				<MobileNavElement
					href='/admin/panel/owners'
					icon={<BsPerson />}
					isChoosen={pathname.match('owners') ?? false}
				>
					Właściele
				</MobileNavElement>
				<MobileNavElement
					href='/admin/panel/waste'
					icon={<BsRecycle />}
					isChoosen={pathname.match('waste') ?? false}
				>
					Odpady
				</MobileNavElement>
				<Link
					href='/admin/panel'
					className='text-xl bg-main p-3 my-1 text-white rounded-full h-full block '
				>
					<LiaHomeSolid />
				</Link>
				<MobileNavElement
					href='/admin/panel/storage'
					icon={<BsColumnsGap />}
					isChoosen={pathname.match('storage') ?? false}
				>
					Magazyny
				</MobileNavElement>
				<MobileNavElement
					href='/admin/panel/transactions'
					icon={<BsCurrencyExchange />}
					isChoosen={pathname.match('transactions') ?? false}
				>
					Transakcje
				</MobileNavElement>
				<MobileNavElement
					href='/admin/panel/reports'
					icon={<BsClipboard2Data />}
					isChoosen={pathname.match('reports') ?? false}
				>
					Raporty
				</MobileNavElement>
			</div>
		</div>
	);
}
