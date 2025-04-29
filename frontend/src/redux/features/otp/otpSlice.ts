import { createAsyncThunk } from "@reduxjs/toolkit";
import { OTPState } from "./type";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import RegisterOTP from "../../../network/models/OTP";
import { RegisterOTPService } from "../../../network/services/OTPService";

const initialState: OTPState = {
    result: {
        success: false,
        message: "",
    }
}

let registerOTPService = new RegisterOTPService();

export const otpVerification = createAsyncThunk("otp/verify-otp",
    async (model: RegisterOTP) => {
        const response = await registerOTPService.add(model);
        //console.log(response.data);
        return response.data;
    })




const otpSlice = createBaseSlice<OTPState>("otp", initialState, [
    {
        thunk: otpVerification,
        onFulfilled: (state, action) => {
            const { success, message } = action.payload;
            state.result = { success, message };
        },
        onRejected: (success, action) => {
            success.result.success = false;
            success.result.message = action.payload.message;
        }
    },


])

export default otpSlice.reducer;




