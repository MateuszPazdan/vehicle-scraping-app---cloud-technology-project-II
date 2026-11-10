import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import './globals.css';
import CustomProvider from './_redux/Provider';
import Setup from './_utils/Setup';

const comfortaa = Comfortaa({
	subsets: ['latin'],
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: 'Vehicle Scrapping',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pl'>
			<body className={comfortaa.className}>
				<CustomProvider>
					<Setup />
					<main>{children}</main>
				</CustomProvider>
			</body>
		</html>
	);
}
