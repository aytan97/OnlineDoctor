import { useEffect } from "react";
import { fetchUser } from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { UserIdProp } from "../../../types/User";

const DoctorAbout: React.FC<UserIdProp> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.auth);
  console.log(list);
  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  const user = list?.find((user) => user._id === id); // ⬅️ Find the specific user by ID

  return (
    <div className="mb-5 about">
      <h3>
        {user?.firstname} {user?.lastname}
      </h3>
      <p> {user?.biography}</p>
    </div>
  );
};

export default DoctorAbout;
