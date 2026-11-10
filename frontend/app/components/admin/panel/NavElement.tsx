import Link from 'next/link';

interface Props {
	icon?: React.ReactNode;
	href: string;
	children: React.ReactNode;
	isChoosen?: boolean |  RegExpMatchArray;
}

function NavElement({ icon, href, children, isChoosen }: Props) {
	return (
		<Link
			href={`${href}`}
			className={`overflow-hidden relative py-10 px-10 flex gap-10 items-center  transition-colors duration-300  hover:text-main after:w-full after:h-[2px] after:absolute after:bg-main after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:translate-x-0 after:-translate-x-full w-full ${
				isChoosen && 'text-main'
			}`}
		>
			<span className='text-2xl mb-[2px]'>{icon}</span>
			<span className='text-xl'>{children}</span>
		</Link>
	);
}

export default NavElement;
