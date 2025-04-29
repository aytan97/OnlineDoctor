import { Helmet } from 'react-helmet-async'
import logoicon from '../../shared/media/images/logoicon.png'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useEffect, useState } from 'react'
import { fetchUsers } from '../../redux/features/auth/authSlice'
import AppointmentsCard from './appointmentsCard'
import { fetchCategories } from '../../redux/features/categories/categorySlice'
import LoadingSpinner from '../../shared/layout/ReactSpinner'
import 'react-toastify/dist/ReactToastify.css';
import { getMe } from '../../redux/features/auth/getMeSlice'
import Footer from '../../shared/layout/Footer'
const Appointments = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.auth.list);
    const getme = useAppSelector((state) => state.getMe.user)
    const categories = useAppSelector((state) => state.categories.list)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(fetchUsers())
            .then(() => setLoading(false));
        dispatch(fetchCategories())
        dispatch(getMe())

    }, [dispatch])

    return (
        <>
            <Helmet>
                <title>Appointments</title>
                <link rel="icon" href={logoicon} />
            </Helmet>
            {loading ? <LoadingSpinner /> : (
                <>
                    <div className="container">
                        <h2 className='mt-2 mb-3' style={{ color: 'var(--primary-color)' }}>My Appointments</h2>
                        {getme && getme?.data?.role === 'patient' &&
                            <div className="appointments-list row d-flex align-item-center justify-center">

                                <div className="appointment-lists col-12 container d-flex align-item-center justify-center">
                                    <div className="appointments-patient row d-flex  align-item-center justify-center">
                                        {users && users?.map((user) => {
                                            if (user.role === 'doctor' && user.status === 'Active' && user.image && user.image.data && Array.isArray(user.image.data)) {
                                                const buffer = user.image.data;
                                                const binary = buffer.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
                                                const base64Image = btoa(binary);
                                                return (
                                                    <AppointmentsCard key={user._id} name={`${user?.firstname} ${user?.lastname}`
                                                    } photo={`data:image/jpeg;base64,${base64Image}`}

                                                        scpeicialities={user.categories.map((catId: string) => {
                                                            const category = categories.find(category => category._id === catId);
                                                            return category ? `${category.categoryName}` : null;
                                                        }).filter((name: any) => name !== null).join(', ').toLowerCase()}


                                                        hospital={user?.currentWorkHospital}
                                                        doctorid={user?._id}
                                                        patientid={getme?.data?.userId}
                                                        date='2024-04-19'
                                                        time='14:00-14:30'
                                                    />
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        }

                        {getme && getme?.data?.role === 'doctor' &&
                            <div className="appointments-list row d-flex align-item-center justify-center">

                                <div className="appointment-lists col-12 container d-flex align-item-center justify-center">
                                    <div className="appointments-doctor row d-flex  align-item-center justify-center">
                                        {users && users?.map((user) => {
                                            if (user.role === 'patient' && user.status === 'Active' && user.image && user.image.data && Array.isArray(user.image.data)) {
                                                const buffer = user.image.data;
                                                const binary = buffer.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
                                                const base64Image = btoa(binary);
                                                return (
                                                    <AppointmentsCard key={user._id} name={`${user?.firstname} ${user?.lastname}`
                                                    } photo={`data:image/jpeg;base64,${base64Image}`}

                                                        doctorid={getme?.data?.userId}
                                                        patientid={user?._id}
                                                        date='2024-04-19'
                                                        time='14:00-14:30'
                                                    />
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </>
            )
            }

            <Footer />
        </>
    )
}

export default Appointments
