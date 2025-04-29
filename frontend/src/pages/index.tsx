import { lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import SuccessPage from "../shared/components/DoctorDetails/addedAvailabilityList/SuccessPage";
import NotFound from "../shared/components/NotFound";
import OTPVerification from "../shared/layout/OTPVerification/otp";
import Cover from "../shared/modules/Cover";
import FAQ from "./FAQ";
import CallApp from "./VideoConferance";

const Home = lazy(() => import("./Home"));
const TalkToDOctor = lazy(() => import("./TalkToDoctor"));
const Blogs = lazy(() => import("./Blogs"));
const Profile = lazy(() => import("../pages/Profile"));
const MyBlogs = lazy(() => import("./MyBlogs"));
const WriteBlog = lazy(() => import("./WriteBlog"));
const Auth = lazy(() => import("./auth"));
const DoctorDetails = lazy(() => import("../shared/components/DoctorDetails"));
const BlogDetails = lazy(() => import("../shared/components/BlogDetails"));
const AvailabilityConfig = lazy(() => import("./AvailabilityConfig"));
const WriteReceipt = lazy(() => import("../shared/components/WriteReceipt"));
const Appointments = lazy(() => import("./Appointments"));
const MyReceipts = lazy(() => import("./Receipts"));

// const LobbyScreen = lazy(() => import('../screens/Lobby'))
const Router = () => {
  const [role, setRole] = useState<string>("patient");
  const { result } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.getMe.user);
  // " https://zoom.us/oauth/authorize?client_id=eWSEtOxWTjSr3EymVfgIYA&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000"
  const toggleSwitch = () => {
    setRole((prevState) => (prevState === "doctor" ? "patient" : "doctor"));
  };

  // let payload = {
  //     meetingNumber: "92469318341",
  //     role: 0,
  //     sdkKey: 'Yfz2VyewQbCnxRckeW_qBA',
  //     sdkSecret: 'uJMvUpmUTfCF0kHZ7lnxKg',
  //     userName: 'Testing',
  //     leaveUrl: 'http://localhost:3000',
  // }

  return (
    <Cover>
      <Routes>
        {result.token && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/talkToDoctor" element={<TalkToDOctor />} />
            <Route path="/doctordetails/:id" element={<DoctorDetails />} />
            <Route path="/blogdetails/:id" element={<BlogDetails />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myProfile" element={<Profile />} />
            <Route path="/checkout-success" element={<SuccessPage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/callDetails/:doctorid/:patientid"
              element={<CallApp />}
            />
            <Route path="/prescriptions" element={<MyReceipts />} />
            {/* <Route path='/Lobby' element={<LobbyScreen />} /> */}
            {user?.data?.role === "doctor" && (
              <>
                <Route path="/writeblog" element={<WriteBlog />} />
                <Route path="/writeBlog/:id" element={<WriteBlog />} />
                <Route path="/myBlogs" element={<MyBlogs />} />
                <Route
                  path="/myavailabilities"
                  element={<AvailabilityConfig />}
                />
                <Route path="/writeReceipt" element={<WriteReceipt />} />
              </>
            )}
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Auth role={role} toggleSwitch={toggleSwitch} />}
        />
        <Route
          path="/register"
          element={<Auth role={role} toggleSwitch={toggleSwitch} />}
        />
        <Route
          path="/otp-verification"
          element={<OTPVerification role={role} />}
        />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Cover>
  );
};

export default Router;
