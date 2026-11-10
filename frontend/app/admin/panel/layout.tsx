import RequireAuth from '@/app/_utils/RequireAuth';

import MobileNav from '@/app/components/admin/panel/MobileNav';
import Nav from '@/app/components/admin/panel/Nav';

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<RequireAuth>
			<div className='grid md:grid-cols-[auto_1fr] h-screen'>
				<Nav />
				<MobileNav />
				<div className='overflow-y-auto md:pb-0 pb-20'>
					<div className='max-w-[1600px] mx-auto'>{children}</div>
				</div>
			</div>
		</RequireAuth>
	);
}
