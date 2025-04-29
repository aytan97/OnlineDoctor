// import { createAsyncThunk } from "@reduxjs/toolkit";
// import http from "../../axiosBase";
// import createBaseSlice from "../../../network/reducers/core/BaseSlice";
// import { BlogState, MyBlogsState } from "./type";
// import { MyBlogService } from "../../../network/services/MyBlogsService";


// const initialState: BlogState = {
//     list: [],
//     status: 'idle',
//     error: null,
//     selected: null
// }

// const myBlogsService = new MyBlogService()
// export const getMyBlogs = createAsyncThunk(
//     "blog/getMyBlogs",
//     async () => {
//         const response = await myBlogsService.getAll();
//         return response.data;
//     }
// );


// const getMyBlogsSlice = createBaseSlice<BlogState>("myblogs", initialState, [
//     {
//         thunk: getMyBlogs,
//         onFulfilled: (state, action) => {
//             state.list = action.payload;
//             console.log("These are my blogs", state.list)
//         },
//     },


// ]);

// export default getMyBlogsSlice.reducer;