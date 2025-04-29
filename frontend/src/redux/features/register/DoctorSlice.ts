import { createAsyncThunk } from "@reduxjs/toolkit";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import { RegisterDoctorState } from "./types";
import { RegisterDoctorService } from "../../../network/services/RegisterDoctorService";
import RegisterDoctor from "../../../network/models/RegisterDoctor";

const initialState: RegisterDoctorState = {

    result: {
        status: "idle",
        statusCode: 0,
        message: "",
        content: []
    }
};

let registerDoctorService = new RegisterDoctorService();

export const addDoctor = createAsyncThunk(
    "authDoctor/registerDoctor",
    async (doctor: RegisterDoctor) => {
        const response = await registerDoctorService.add(doctor);
        // console.log(response.data);
        return response.data;
    }
);


export const updateDoctor = createAsyncThunk(
    "auth/updateDoctor",
    async (doctor: RegisterDoctor) => {
        const response = await registerDoctorService.update(doctor._id, doctor);
        return response.data;
    }
);


const doctorSlice = createBaseSlice<RegisterDoctorState>(
    "doctor",
    initialState,
    [
        {
            thunk: addDoctor,
            onFulfilled: (state, action) => {
                state.result.content.push(action.payload);
            },
        },

        {
            thunk: updateDoctor,
            onFulfilled: (state, action) => {
                if (action.payload) {
                    state.result.content = state.result.content.map((doctor) =>
                        doctor._id === action.payload._id ? action.payload : doctor
                    );
                }
            },
        },
    ]
);


export default doctorSlice.reducer;