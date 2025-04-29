import { Helmet } from 'react-helmet-async'
import logoicon from '../../shared/media/images/logoicon.png'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useEffect, useState } from 'react'
import { fetchUsers } from '../../redux/features/auth/authSlice'
import DoctorsCard from './doctorsCard'
import { fetchCategories } from '../../redux/features/categories/categorySlice'
import LoadingSpinner from '../../shared/layout/ReactSpinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMe } from '../../redux/features/auth/getMeSlice'
import Search, { SearchProps } from 'antd/es/input/Search'
import Footer from '../../shared/layout/Footer'

const TalkToDOctor = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.auth.list);
    const getme = useAppSelector((state) => state.getMe.user)
    const categories = useAppSelector((state) => state.categories.list)
    const [notificationShown, setNotificationShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchUsers())
            .then(() => setLoading(false));
        dispatch(fetchCategories())
        dispatch(getMe())
        if (!notificationShown) {
            toast.info("Welcome dear Doctor! If you do not find yourself between cards, please check if you completed all your data from your Profile", {
                autoClose: 10000,
                position: "top-right",
            });
            setNotificationShown(true);
        }
    }, [dispatch, notificationShown])

    const filteredUsers = users?.filter(user =>
        user?.role === 'doctor' &&
        user?.status === 'Active' &&
        user?.image &&
        user?.image.data &&
        Array.isArray(user?.image?.data) &&
        (user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearchQuery(value);
    };

    return (
        <>
            <Helmet>
                <title>TalktoDoctor</title>
                <link rel="icon" href={logoicon} />
            </Helmet>
            {loading ? <LoadingSpinner /> : (
                <>
                    {getme && getme?.data?.role === 'doctor' && getme?.data?.status === 'Waiting' && <ToastContainer />}
                    <div className='container d-flex align-item-center justify-center '>

                        <div className="doctors-list row d-flex align-item-center justify-center">
                            <div className="find-doctor col-12 d-flex align-item-center justify-center">
                                <Search placeholder="Find doctors" allowClear onSearch={onSearch} style={{ width: 500, zIndex: 0 }} />
                            </div>
                            <div className="doctor-lists col-12 container d-flex align-item-center justify-center">
                                <div className="doctors row d-flex  align-item-center justify-center">
                                    {filteredUsers?.map((user) => (
                                        <DoctorsCard key={user?._id} name={`${user?.firstname} ${user?.lastname}`}
                                            photo={`data:image/jpeg;base64,${btoa(user.image.data.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), ''))}`}
                                            scpeicialities={user.categories.map((catId: string) => {
                                                const category = categories.find(category => category._id === catId);
                                                return category ? `${category.categoryName}` : null;
                                            }).filter((name: any) => name !== null).join(', ').toLowerCase()}
                                            languageSkills={user?.languageSkills.map((languages: string) => languages).join('\n').toLowerCase()}
                                            hospital={user?.currentWorkHospital}
                                            workExperience={user?.workExperience}
                                            id={user?._id}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </>
    )
}

export default TalkToDOctor
