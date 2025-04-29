import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../axiosBase";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import { BookingState } from "./type";
import AddBooking from "../../../network/models/AddBooking";

const initialState: BookingState = {
    status: "idle",
    statusCode: 0,
    message: "",
    content: []
}

export const addBooking = createAsyncThunk(
    "/bookings/checkout-session",
    async ({ id, model }: { id: string, model: AddBooking }, { rejectWithValue }) => {
        try {
            const response = await http.post(`/bookings/checkout-session/${id}`, model);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


const bookingSlice = createBaseSlice<BookingState>("booking", initialState, [
    {
        thunk: addBooking,
        onFulfilled: (state, action) => state.content.push(action.payload),
    },
])

export default bookingSlice.reducer;
