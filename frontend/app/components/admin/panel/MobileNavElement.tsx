import Link from 'next/link';

interface Props {
	icon?: React.ReactNode;
	href: string;
	children: React.ReactNode;
	isChoosen?: boolean | RegExpMatchArray;
}
export default function MobileNavElement({
	icon,
	children,
	href,
	isChoosen,
}: Props) {
	return (
		<Link
			href={href}
			className={`flex flex-col gap-1 items-center justify-center p-2  hover:text-main transition-colors duration-300 ${
				isChoosen && 'text-main'
			}`}
		>
			<span className='text-xl'>{icon} </span>
			<span className='text-center hidden sm:inline text-sm'>{children}</span>
		</Link>
	);
}
