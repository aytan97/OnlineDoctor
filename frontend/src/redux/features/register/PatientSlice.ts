import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterPatientService } from "../../../network/services/RegisterPatientService";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import { RegisterPatientState } from "./types";
//import http from "../../axiosBase";
import RegisterPatient from "../../../network/models/RegisterPatient";
import { UserService } from "../../../network/services/UserService";

const initialState: RegisterPatientState = {
    result: {
        status: "idle",
        statusCode: 0,
        message: "",
        content: []
    }
};

let registerPatientService = new RegisterPatientService();
let userService = new UserService();

export const addPatient = createAsyncThunk(
    "patient/addPatient",
    async (patient: RegisterPatient) => {
        const response = await registerPatientService.add(patient);
        //console.log(response.data);
        return response.data;
    }
);

export const fetchUsers = createAsyncThunk(
    "auth/fetchUsers",
    async () => {
        const response = await userService.getAll();
        return response.data;
    }
);

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (id: string) => {
        const response = await userService.get(id);
        return response.data;
    }
);


export const updatePatient = createAsyncThunk(
    "auth/updatePatient",
    async (patient: RegisterPatient) => {
        const response = await registerPatientService.update(patient._id, patient);
        return response.data;
    }
);


const patientSlice = createBaseSlice<RegisterPatientState>(
    "patient",
    initialState,
    [
        {
            thunk: addPatient,
            onFulfilled: (state, action) => {
                state.result.content.push(action.payload);
            },
        },
        {
            thunk: fetchUsers,
            onFulfilled: (state, action) => {
                state.result.content = action.payload;
            },
        },
        {
            thunk: fetchUser,
            onFulfilled: (state, action) => {
                state.result.content = action.payload;
            },
        },
        {
            thunk: updatePatient,
            onFulfilled: (state, action) => {
                if (action.payload) {
                    state.result.content = state.result.content.map((patient) =>
                        patient._id === action.payload._id ? action.payload : patient
                    );
                }
            },
        },
    ]
);


export default patientSlice.reducer;