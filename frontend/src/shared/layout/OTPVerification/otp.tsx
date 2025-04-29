import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpSchema } from '../../../validation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import cancelclose from '../../media/images/cancel-close.svg';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IToggle } from '../../models';
import healthcareConcept from '../../media/images/healthcare-concept.jpg'
import { otpVerification } from '../../../redux/features/otp/otpSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface OTPFormValues {
    email: string;
    otp: string;
}

const OTPVerification: React.FC<IToggle> = ({ role }) => {
    const dispatch = useAppDispatch();
    const navigator = useNavigate()
    const [timeLeft, setTimeLeft] = useState(300);
    const [state, setState] = useState(true)
    useEffect(() => {
        if (!state) {
            toast.error('Please make sure you enter registered Email and received OTP code', {
                autoClose: 10000,
                position: "top-left",
            });

            setState(true)
        }
        if (timeLeft == 10) {
            toast.error('OTP code has been expiring. Please signup again!', {
                autoClose: 10000,
                position: "top-left",
            });
        }
    }, [state, timeLeft]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<OTPFormValues>({
        resolver: yupResolver(otpSchema),
    });


    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                navigator('/login');

            }
        }, 1000);

        return () => clearTimeout(timer)
    }, [timeLeft, navigator]);

    const handleClose = () => {
        navigator("/login")
    }

    const onSubmit = async (data: any) => {

        dispatch(otpVerification(data)).then((confirm) => {
            if (confirm && confirm.meta.requestStatus === 'fulfilled') {
                navigator("/login")
                setState(true)
            }
        }).catch(() => {
            setState(false);
        })
            .finally(() => {
                reset()
            })
    };

    return (
        <>
            <div className='otp-container container d-flex align-items-center justify-center'>
                <div className="row otp-row">
                    <img src={healthcareConcept} alt="" />
                    <div className="otp-modal">
                        <img className="cancel" src={cancelclose} alt="close" onClick={handleClose} />
                        <div className='otp-form-container'>

                            <form onSubmit={handleSubmit(onSubmit)} className='container flex-column d-flex align-items-center justify-center'>
                                <div className=" flex-column d-flex align-items-center justify-center">
                                    <h2>Check your email for OTP code</h2>
                                    <div className='form-item'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" {...register('email')} />
                                        <p>{errors.email?.message}</p>
                                    </div>

                                    <div className='form-item'>
                                        <label htmlFor="otp">Enter OTP code</label>
                                        <input type="text" {...register('otp')} />
                                        <p>{errors.otp?.message}</p>
                                    </div>
                                    <div><button type="submit" style={{ transform: "rotateY(0deg)" }} className='btn'>Next</button></div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default OTPVerification;
