'use client';

import { Climate_Crisis } from 'next/font/google';
import Link from 'next/link';
import {
	BsClipboard2Data,
	BsColumnsGap,
	BsCurrencyExchange,
	BsPerson,
	BsRecycle,
} from 'react-icons/bs';
import NavElement from './NavElement';
import Button from '../../Button';
import { LiaCarCrashSolid } from 'react-icons/lia';
import { usePathname } from 'next/navigation';
import { useLogoutMutation } from '@/app/_redux/features/authApiSlice';
import { logout as logoutUser } from '@/app/_redux/features/authSlice';
import { useAppDispatch } from '@/app/_redux/hooks';

import { toast } from 'react-toastify';

const climate_crisit = Climate_Crisis({
	subsets: ['latin'],
	weight: ['400'],
});

function Nav() {
	const pathname = usePathname();
	const [logout] = useLogoutMutation();
	const dispatch = useAppDispatch();

	function handleLogout() {
		logout({})
			.unwrap()
			.then(() => {
				dispatch(logoutUser());
				toast.success('Wylogowano pomyślnie');
			})
			.catch(() => {
				toast.error('Wystąpił błąd');
			});
	}

	return (
		<div className='hidden md:block border-r-2 border-main min-h-screen bg-white overflow-y-auto'>
			<div className='grid grid-rows-[auto_1fr_auto] h-full '>
				<Link
					href='/admin/panel'
					className='text-main hover:text-mainHover transition-colors duration-300 flex flex-col w-fit items-center px-10 py-10 mr-20'
				>
					<span className={`${climate_crisit.className}  text-4xl`}>VS App</span>
				</Link>

				<div>
					<NavElement
						href='/admin/panel/vehicles'
						icon={<LiaCarCrashSolid />}
						isChoosen={pathname.match('vehicles') ?? false}
					>
						Pojazdy
					</NavElement>
					<NavElement
						href='/admin/panel/owners'
						icon={<BsPerson />}
						isChoosen={pathname.match('owners') ?? false}
					>
						Właściciele
					</NavElement>
					<NavElement
						href='/admin/panel/waste'
						icon={<BsRecycle />}
						isChoosen={pathname.match('waste') ?? false}
					>
						Odpady
					</NavElement>
					<NavElement
						href='/admin/panel/storage'
						icon={<BsColumnsGap />}
						isChoosen={pathname.match('storage') ?? false}
					>
						Magazyny
					</NavElement>
					<NavElement
						href='/admin/panel/transactions'
						icon={<BsCurrencyExchange />}
						isChoosen={pathname.match('transactions') ?? false}
					>
						Transakcje
					</NavElement>
					<NavElement
						href='/admin/panel/reports'
						icon={<BsClipboard2Data />}
						isChoosen={pathname.match('reports') ?? false}
					>
						Raporty
					</NavElement>
				</div>

				<div className='flex justify-center items-center w-full py-10'>
					<Button type='button' onClick={() => handleLogout()}>
						Wyloguj się
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Nav;
