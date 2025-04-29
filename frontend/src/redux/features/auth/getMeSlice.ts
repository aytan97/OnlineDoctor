import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetMeState } from "./type";
import http from "../../axiosBase";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import Buffer from 'buffer'
const initialState: GetMeState = {
    user: null,
    isLoading: false,
    error: null
};



export const getMe = createAsyncThunk("getMe/getMe", async () => {
    try {
        const response = await http.get("auth/getMe");
        return response.data;
    } catch (error) {
        // Handle errors if necessary
        throw error;
    }
});

const getMeSlice = createBaseSlice<GetMeState>("getMe", initialState, [
    {
        thunk: getMe,
        onPending: (state) => {
            state.isLoading = true;
        },
        onFulfilled: (state, action) => {

            state.user = action.payload;
            state.isLoading = false;

            const buffer = state?.user?.data?.image?.data;
            const binary = buffer?.reduce((acc: string, byte: number) => {
                return acc + String.fromCharCode(byte);
            }, '');
            const base64Image = btoa(binary);
            localStorage.setItem('profileImage', `data:image/jpeg;base64,${base64Image}`);
        },
        onRejected: (state) => {
            state.isLoading = false;
        }
    },

])

export default getMeSlice.reducer;