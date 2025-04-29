import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupAsPatientSchema } from '../../../validation';
import * as yup from 'yup'


interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupasDoctor: React.FC = () => {
    const [page, setPage] = useState(1);
    const { register, handleSubmit, formState: { isSubmitting, errors }, setError, getValues, reset } = useForm<FormValues>({
        resolver: yupResolver(signupAsPatientSchema),
    });

    const onSubmit = (data: FormValues) => {
        if (page === 1) {
            setPage(2);
        } else {
            console.log(data);
            reset();
            setPage(1);
            // Here you can submit the data to your backend or perform any other necessary actions
        }
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    const onNextClick = async () => {
        try {
            if (page === 1) {
                await signupAsPatientSchema.fields.firstName.validate(getValues('firstName'), { abortEarly: false });
                await signupAsPatientSchema.fields.lastName.validate(getValues('lastName'), { abortEarly: false });
                await signupAsPatientSchema.fields.email.validate(getValues('email'), { abortEarly: false });
            } else {
                await signupAsPatientSchema.fields.password.validate(getValues('password'), { abortEarly: false });
                await signupAsPatientSchema.fields.confirmPassword.validate(getValues('confirmPassword'), { abortEarly: false });
            }
            setPage(2);
        } catch (err) {
            if (err instanceof yup.ValidationError && err.name === 'ValidationError') {
                err.inner.forEach((error: any) => {
                    setError(error.path, { type: 'manual', message: error.message });
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
            {page === 1 && (
                <>
                    <div>
                        <label>First Name:</label>
                        <input type="text" {...register('firstName')} />
                        <p>{errors.firstName?.message}</p>
                    </div>

                    <div>
                        <label>Last Name:</label>
                        <input type="text" {...register('lastName')} />
                        <p>{errors.lastName?.message}</p>
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="email" {...register('email')} />
                        <p>{errors.email?.message}</p>
                    </div>

                    <div style={{ transform: "rotateY(180deg)" }} className='btn'>
                        <button type="submit" onClick={onNextClick}>Next</button>
                    </div>
                </>
            )}

            {page === 2 && (
                <>
                    <div>
                        <label>Password:</label>
                        <input type="password" {...register('password')} />
                        <p>{errors.password?.message}</p>
                    </div>

                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" {...register('confirmPassword')} />
                        <p>{errors.confirmPassword?.message}</p>
                    </div>

                    <div style={{ transform: "rotateY(180deg)" }} className='btn'>
                        <button type="button" onClick={prevPage}>Previous</button>

                    </div>
                </>
            )}
            {page === 2 && (
                <div style={{ transform: "rotateY(180deg)" }} className='btn'>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </div>
            )}
        </form >
    );
};

export default SignupasDoctor;
