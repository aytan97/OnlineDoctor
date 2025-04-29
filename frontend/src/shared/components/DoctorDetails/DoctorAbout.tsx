import { useEffect } from "react";
import { fetchUser } from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UserIdProp } from "../../../types/User";


const DoctorAbout: React.FC<UserIdProp> = ({ id }) => {
    const dispatch = useAppDispatch()
    const { list } = useAppSelector((state) => state.auth);
    console.log(list)
    useEffect(() => {
        if (id) {
            dispatch(fetchUser(id))
        }

    }, [dispatch, id]);
    return (
        <div className="mb-5 about">
            <h3> {list?.firstname} {list?.lastname}</h3>
            <p> {list?.biography}</p>
        </div>
    )
}

export default DoctorAbout
