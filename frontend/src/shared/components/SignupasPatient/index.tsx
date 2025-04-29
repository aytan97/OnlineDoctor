import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupAsPatientSchema } from '../../../validation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addPatient, fetchUsers } from '../../../redux/features/register/PatientSlice';
import { useNavigate } from 'react-router-dom';
import { IToggle } from '../../models';

interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
    role?: string;
}

const SignupasPatient: React.FC<IToggle> = ({ role }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const users = useAppSelector((state) => state.patient.result.content);
    const result = useAppSelector((state) => state.patient.result)
    const userEmails = users && Array.isArray(users) ? users.map((user) => user.email) : [];
    useEffect(() => {
        dispatch(fetchUsers());
        if (result && result.status === "succeeded") {
            navigate("/login")
        }
    }, [navigate, dispatch]);

    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<FormValues>({
        resolver: yupResolver(signupAsPatientSchema),
    });

    const onSubmit = async (data: any) => {
        const emailExists = userEmails.includes(data.email);

        if (emailExists) {
            setError('email', {
                type: 'manual',
                message: 'Email already exists',
            });
            return;
        }

        dispatch(addPatient(data));
        navigate("/otp-verification")
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='patient-form-container'>
                <h2>Patient registration</h2>
                <input type="hidden" {...register('role')} value={role} />

                <div className='form-lines'>
                    <div className='form-item'>
                        <label>First Name:</label>
                        <input type="text" {...register('firstname')} />
                        <p>{errors.firstname?.message}</p>
                    </div>

                    <div className='form-item'>
                        <label>Last Name:</label>
                        <input type="text" {...register('lastname')} />
                        <p>{errors.lastname?.message}</p>
                    </div>
                </div>
                <div className='form-lines'>
                    <div className='form-item'>
                        <label>Email:</label>
                        <input type="email" {...register('email')} />
                        <p>{errors.email?.message}</p>
                    </div>
                    <div className='form-item'>
                        <label>Age:</label>
                        <input type="number" {...register('age', { valueAsNumber: true })} />
                        <p>{errors.age?.message}</p>
                    </div>
                </div>
                <div className='form-lines'>
                    <div className='form-item'>
                        <label>Password:</label>
                        <input type="password" {...register('password')} />
                        <p>{errors.password?.message}</p>
                    </div>

                    <div className='form-item'>
                        <label>Confirm Password:</label>
                        <input type="password" {...register('confirmPassword')} />
                        <p>{errors.confirmPassword?.message}</p>
                    </div>
                </div>
                <div><button type="submit" style={{ transform: "rotateY(0deg)" }} className='btn mb-4'>Submit</button></div>
            </form>

        </>
    );
};

export default SignupasPatient;
