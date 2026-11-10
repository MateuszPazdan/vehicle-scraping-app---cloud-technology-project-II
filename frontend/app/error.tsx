'use client';

import Link from 'next/link';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div>
			<h2>Coś poszło nie tak</h2>
			<p>{error.message}</p>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Spróbuj ponownie
			</button>
			<Link href='/'>Powrót do strony głównej</Link>
		</div>
	);
}
