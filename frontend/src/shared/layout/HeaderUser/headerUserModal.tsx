import React, { useEffect, useState } from 'react'
import cancelclose from '../../media/images/cancel-close.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getMe } from '../../../redux/features/auth/getMeSlice';
import { HeaderUserProps } from '../../models';
import avatarprof from '../../media/images/avatarprof.svg'

const HeaderUser: React.FC<HeaderUserProps> = ({ onClose }) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { logoutAuth } = useAuth();
    const user = useAppSelector((state) => state.getMe.user);
    const { result } = useAppSelector((state) => state.auth)
    const [storedImage, setStoredImage] = useState<string | null>(null);
    useEffect(() => {
        if (result.token) {
            dispatch(getMe());
        }
    }, [dispatch, result]);

    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setStoredImage(storedImage);
        }

    }, []);

    console.log(result)
    const handleLogout = () => {
        navigate("/login")
        logoutAuth();
        location.reload();
    }

    return (
        <div className="user-profile">
            <div className="user-info">
                <div className='round-image '>
                    {!storedImage ? <img src={avatarprof} alt='prof-avatar' /> : <img src={storedImage} alt='avatar-prof' />}
                </div>
                {result?.token && user && <h2>{`${user.data.firstname} ${user.data.lastname}`}</h2>}
                <div className="cancel">
                    <img src={cancelclose} alt="close" onClick={onClose} />
                </div>
            </div>
            <div className='user-profile-detail'>
                <Link className='text-decoration menu-item' to='/myProfile' onClick={onClose} >  My Profile</Link>
                <Link className='text-decoration menu-item' to='/prescriptions' onClick={onClose}>  Prescriptions</Link>
                <Link className='text-decoration menu-item' to='/appointments' onClick={onClose}>Appointments</Link>
                {/* <Link className='text-decoration menu-item' to='/billings' onClick={onClose}>Billings</Link> */}

                {user?.data?.role !== 'patient' && (
                    <>
                        <Link className='text-decoration menu-item' to='/myBlogs' onClick={onClose}>My Blogs</Link>
                        <Link className='text-decoration menu-item' to='/writeReceipt' onClick={onClose}>Write Receipt</Link>
                        <Link className='text-decoration menu-item' to='/myavailabilities' onClick={onClose}>Enter your Availability</Link>
                        {/* <div className="balance menu-item">Balance: ${100}</div> */}
                    </>
                )
                }
            </div>

            <div className="log-out menu-item" onClick={handleLogout}><Link to='/' className='text-decoration' >Logout</Link></div>

        </div>
    );
};

export default HeaderUser




