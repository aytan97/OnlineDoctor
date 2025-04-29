import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import MyProfile from "../../shared/components/MyProfile"
import { getMe } from "../../redux/features/auth/getMeSlice"

const Profile = () => {
    const dispatch = useAppDispatch()

    const { result } = useAppSelector(state => state.auth);
    useEffect(() => {
        if (result.token) {
            dispatch(getMe());
        }

    }, [dispatch, result])
    return (
        <div className='profile-container mt-3 container'>
            <div className="profile-ittems">

                <div className="profile-details "> <MyProfile /></div>
            </div>
        </div>
    )
}

export default Profile
