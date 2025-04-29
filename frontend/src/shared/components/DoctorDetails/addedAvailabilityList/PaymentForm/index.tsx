import React, { useEffect, useState } from 'react'
import logo2 from '../../../../media/images/logo2.png'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getMe } from '../../../../../redux/features/auth/getMeSlice';
import { fetchUser } from '../../../../../redux/features/auth/authSlice';
import { Controller, useForm } from 'react-hook-form'
import { Image } from "antd";
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentSchema } from '../../../../../validation';
import SuccessResult from '../SuccessPage';
import { addZoomSignature } from '../../../../../redux/features/Zoom/zoomSlice.ts';
interface SlotDetailProps {
    selectedSlot: any;
    doctorId: string;
    patientId: string

}

const PaymentForm: React.FC<SlotDetailProps> = (props) => {
    const dispatch = useAppDispatch()
    const mine = useAppSelector((state) => state.getMe.user)
    const { list } = useAppSelector(state => state.auth);
    const { selectedSlot, doctorId, patientId } = props;
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    console.log("DETAILS:", selectedSlot.date, doctorId, patientId)

    useEffect(() => {
        dispatch(getMe())
        if (doctorId) {
            dispatch(fetchUser(doctorId))
        }
    }, [dispatch, doctorId])


    const {
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setError
    } = useForm({ resolver: yupResolver(paymentSchema) })

    useEffect(() => {
        if (mine?.data) {
            const { firstname, lastname } = mine?.data;

            reset({
                name: `${firstname} ${lastname}`
            })
        }
    }, [mine, reset])

    function convertToDate(dateString: any) {
        const parts = dateString.split('-');
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // month is 0-indexed in JavaScript
        const day = parseInt(parts[2]) + 1;
        return new Date(year, month, day);
    }

    const handleSubmitBtn = async (formResult: any) => {
        const date = convertToDate(selectedSlot?.date)
        const time = selectedSlot?.time
        dispatch(addZoomSignature({ doctorId: doctorId, patientId: patientId, date: date, time: time }))

        console.log(formResult)
        setPaymentSuccess(true)
        reset();
    };

    return (
        <>
            {
                !paymentSuccess && (

                    <div className='payment-container mt-2'>
                        <div className="images ml-3">
                            <div className="doctor-image">
                                {list && list?.image && list?.image.data && Array.isArray(list?.image.data) && (
                                    (() => {
                                        const buffer = list?.image.data;
                                        const binary = buffer.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
                                        const base64Image = btoa(binary);
                                        return <Image src={`data:image/jpeg;base64, ${base64Image}`} alt="blog-image" style={{ width: "100%" }} preview={false} />;
                                    })()
                                )}
                            </div >
                            <div className='logo-image'> <img src={logo2} alt="" /></div>
                        </div >
                        <div className='ml-3'>
                            <div className='payment-details mb-4 ml- '>
                                <p><i>Your doctor: </i> <span>{list?.firstname} {list?.lastname}</span></p>
                                <p><i>Selected date and time:</i>  <span>{selectedSlot.date}  {selectedSlot.time}</span></p>
                                <p><i>Cost: </i> <span>{selectedSlot.doctorCost}</span></p>
                            </div>
                            <div className="payment-form ">
                                <form onSubmit={handleSubmit(handleSubmitBtn)} className='container'>
                                    <div className="row  form-items mb-4">
                                        <div className='form-item '>
                                            <Controller
                                                defaultValue=""
                                                control={control}
                                                name="name"
                                                render={({ field }) => (
                                                    <>
                                                        <input
                                                            {...field}
                                                            variant="filled"
                                                            type="text"
                                                            placeholder='The Name and Surname on the Card'
                                                        />{' '}
                                                    </>
                                                )}
                                            />
                                            {errors.name && <p className="error">{errors.name.message}</p>}

                                        </div>

                                        <div className='form-item '>
                                            <Controller
                                                defaultValue=""
                                                control={control}
                                                name="cardNumber"
                                                render={({ field }) => (
                                                    <>
                                                        <input
                                                            {...field}
                                                            variant="filled"
                                                            type="text"
                                                            placeholder='1234 1234 1234 1234'
                                                        />{' '}
                                                    </>
                                                )}
                                            />
                                            {errors.cardNumber && <p className="error ">{errors.cardNumber.message}</p>}

                                        </div>

                                        <div className="form-group d-flex justify-space-between align-items-center ">
                                            <div className="form-item">
                                                <Controller
                                                    defaultValue=""
                                                    control={control}
                                                    name="expiryDate"
                                                    render={({ field }) => (
                                                        <>
                                                            <input
                                                                {...field}
                                                                variant="filled"
                                                                type="text"
                                                                placeholder='MM/YYYY'

                                                            />{' '}
                                                        </>
                                                    )}
                                                />
                                                {errors.expiryDate && <p className="error ">{errors.expiryDate.message}</p>}
                                            </div>
                                            <div className="form-item ">
                                                <Controller
                                                    defaultValue=""
                                                    control={control}
                                                    name="cvc" //Card Verification Code
                                                    render={({ field }) => (
                                                        <>
                                                            <input
                                                                {...field}
                                                                variant="filled"
                                                                type="text"
                                                                placeholder='CVC2/CVV2'
                                                            />{' '}
                                                        </>
                                                    )}
                                                />
                                                {errors.cvc && <p className="error ">{errors.cvc.message}</p>}
                                            </div>
                                        </div>
                                        <button type='submit'>Proceed</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                )
            }
            {paymentSuccess && <SuccessResult />}

        </>
    )

}

export default PaymentForm
