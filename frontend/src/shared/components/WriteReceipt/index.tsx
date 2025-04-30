import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Select } from 'antd'
import { fetchUsers } from '../../../redux/features/auth/authSlice'
import { Helmet } from 'react-helmet-async'
import logoicon from '../../media/images/logoicon.png'
import AddedDrugsList from './AddedDrugsList'
import AddReceipt from './AddDrugDetails/test'

const WriteReceipt = () => {
    const dispatch = useAppDispatch()
    const { list } = useAppSelector((state) => state.auth)
    const [patient, setPatient] = useState('')
    const [receiptData, setReceiptData] = useState([{}]);
    const {
        handleSubmit,
        reset,
        control
    } = useForm()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handlePatientSelect = (value: any) => {
        setPatient(value);
    };
    const handleSubmitBtn = async (formResult: any) => {
        setReceiptData([...receiptData, formResult]);
        reset();
    };

    return (
        <>
            <Helmet>
                <title>Write Receipt</title>
                <link rel="icon" href={logoicon} />
            </Helmet>
            <div className="container">
                <h2 className='mt-3' style={{ color: 'var(--primary-color)' }}>Manage receipts</h2>
                <div className='receipt-management'>
                    <form onSubmit={handleSubmit(handleSubmitBtn)} className="row">
                        <div className="receipt-form-container mt-4">
                            <div className="form-items">
                                <div className='form-item'>
                                    <Controller
                                        control={control}
                                        name="patient"
                                        render={({ field }) => (
                                            <Select
                                                style={{ width: '300px', height: '40px' }}
                                                placeholder="Select Patient"
                                                options={
                                                    Array.isArray(list)
                                                        ? list
                                                            .filter((item) => item?.role === 'patient')
                                                            .map((item) => ({
                                                                value: item._id,
                                                                label: `${item.firstname} ${item.lastname}`,
                                                            }))
                                                        : []
                                                }
                                                {...field}
                                                onChange={(value) => {
                                                    handlePatientSelect(value);
                                                    field.onChange(value); // Keep this to update react-hook-form field value
                                                }}
                                            />

                                        )}
                                    />
                                </div>

                                <AddReceipt onSubmit={handleSubmit(handleSubmitBtn)} patientId={patient} />
                            </div>
                        </div>
                    </form>
                    <div className='added-drug-list mt-4'>
                        <AddedDrugsList />
                    </div>
                </div>
            </div>
        </>
    )
}
export default WriteReceipt
