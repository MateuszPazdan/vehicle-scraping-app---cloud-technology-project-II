'use client';

import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import {
	FieldError,
	FieldErrorsImpl,
	FieldValues,
	Merge,
	UseFormRegister,
} from 'react-hook-form';
import { IoMdInformationCircleOutline } from 'react-icons/io';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegister<FieldValues>;
	label?: string;
	field: string;
	error?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
	validateFunction?: () => string | boolean;
	info?: string | boolean;
	initialValue?: string | number;
	type?: HTMLInputTypeAttribute;
}

function TextInput({
	register,
	error,
	label,
	field,
	validateFunction,
	info,
	initialValue,
	...rest
}: TextInputProps) {
	return (
		<div className='relative flex flex-col gap-2 w-full'>
			<div className='relative'>
				<div className='flex flew-row gap-1 items-center'>
					<label className='pl-2 font-semibold'>{label}</label>
					{info && (
						<div className='relative group'>
							<span className='text-md hover:text-gray hover:cursor-help'>
								<IoMdInformationCircleOutline />
							</span>
							<p className='text-center hidden group-hover:block absolute left-4 top-4 w-40 sm400:w-60 z-10 shadow-myShadow rounded-sm p-4 text-[12px] bg-white'>
								{info}
							</p>
						</div>
					)}
				</div>
			</div>
			<input
				{...register(field, {
					required:
						field === 'repeatPassword' ? 'Powtórz Hasło' : `Wprowadź ${label}`,
					validate: validateFunction,
				})}
				className={`w- full p-3 border-[1px] focus:outline-none focus:ring-0 rounded-xl border-gray/50`}
				defaultValue={initialValue}
				{...rest}
			/>
			<div className='absolute -bottom-6 text-sm left-2 text-red-500'>
				{error && <span>{error.toString()}</span>}
			</div>
		</div>
	);
}

export default TextInput;
