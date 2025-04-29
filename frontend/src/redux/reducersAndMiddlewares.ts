import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import DoctorSlice from "./features/register/DoctorSlice";
import PatientSlice from "./features/register/PatientSlice";
import otpSlice from "./features/otp/otpSlice";
import categorySlice from "./features/categories/categorySlice";
import getMeSlice from "./features/auth/getMeSlice";
import blogSlice from "./features/blogs/blogSlice";
import bookingSlice from "./features/booking/bookingSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    getMe: getMeSlice,
    authDoctor: DoctorSlice,
    patient: PatientSlice,
    otpVerification: otpSlice,
    categories: categorySlice,
    blog: blogSlice,
    booking: bookingSlice,
})

export default rootReducer;
