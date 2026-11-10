import { Metadata } from 'next';
import LoginForm from './components/admin/auth/LoginForm';

export const metadata: Metadata = {
	title: 'Vehicle Scrapping | Logowanie',
};

export default function page() {
	return <LoginForm />;
}
