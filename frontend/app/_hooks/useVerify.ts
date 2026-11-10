import { useEffect } from 'react';

import { finishInitialLoad, setAuth } from '../_redux/features/authSlice';
import { useAppDispatch } from '../_redux/hooks';
import { useVerifyTokenMutation } from '../_redux/features/authApiSlice';

export default function useVerify() {
	const [verifyToken] = useVerifyTokenMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		verifyToken(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, [dispatch, verifyToken]);
}
