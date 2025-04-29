import { createAsyncThunk } from "@reduxjs/toolkit";
import { ZoomState } from "./type";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import { ZoomService } from "../../../network/services/ZoomService";
import ZoomModel from "../../../network/models/ZoomModel";

const initialState: ZoomState = {
    status: "idle",
    statusCode: 0,
    message: "",
    content: []
}

let zoomService = new ZoomService();

export const addZoomSignature = createAsyncThunk("zoom/generate",
    async (model: ZoomModel) => {
        const response = await zoomService.add(model);
        console.log(response.data);
        return response.data;
    })




const zoomSlice = createBaseSlice<ZoomState>("zoom", initialState, [
    {
        thunk: addZoomSignature,
        onFulfilled: (state, action) => state.content.push(action.payload),
    },


])

export default zoomSlice.reducer;




