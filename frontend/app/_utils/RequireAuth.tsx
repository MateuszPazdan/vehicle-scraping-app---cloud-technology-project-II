'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from '../_redux/hooks';
import Spinner from '../components/Spinner';

interface RequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

	if (isLoading)
		return (
			<div className='h-screen'>
				<Spinner size='large' />
			</div>
		);

	if (!isAuthenticated) {
		redirect('/');
	}

	return <>{children}</>;
}
