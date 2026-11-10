'use client';

import {
	useLoginMutation,
	useRetrieveUserQuery,
} from '@/app/_redux/features/authApiSlice';
import { setAuth } from '@/app/_redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/app/_redux/hooks';
import { validateEmail } from '@/app/_utils/isInputCorrect';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextInput from '../../TextInput';
import Button from '../../Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function LoginForm() {
	const { isAuthenticated, isLoading: isAuthenticating } = useAppSelector(
		(state) => state.auth
	);
	const { refetch } = useRetrieveUserQuery();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FieldValues>();
	const [login, { isLoading }] = useLoginMutation();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		login({ email: data.email, password: data.password })
			.unwrap()
			.then(() => {
				router.push('/admin/panel');
				dispatch(setAuth());
				refetch();
				toast.success('Zalogowano pomyślnie');
			})
			.catch(() => {
				toast.error('Niepoprawne dane logowania');
			});
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/admin/panel');
		}
	}, [isAuthenticated, router]);

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative flex justify-center items-center md:py-10 '
			>
				<div className='sm:w-[400px] md:w-[500px] w-full px-5 sm:px-10 pb-6 pt-5 bg-white sm:shadow-myShadow shadow-shadowBlack rounded-xl gap-8 flex flex-col items-center'>
					<div className='relative'>
						<p className='pb-5 text-3xl mt-4'>Logowanie - test CI/CD</p>
					</div>

					<TextInput
						register={formRegister}
						error={errors?.email?.message}
						label={'E-mail'}
						field={'email'}
						type={'email'}
						validateFunction={() => validateEmail(getValues().email)}
						name='email'
						autoComplete='email'
					/>

					<TextInput
						register={formRegister}
						error={errors?.password?.message}
						label={'Hasło'}
						field={'password'}
						type={'password'}
						name='password'
						autoComplete='current-password'
					/>

					<div className='mt-6'>
						<Button type={'submit'} isLoading={isLoading || isAuthenticating}>
							<span>Zaloguj się</span>
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}

export default LoginForm;
