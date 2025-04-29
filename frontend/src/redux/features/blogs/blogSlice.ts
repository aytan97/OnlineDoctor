import { createAsyncThunk } from "@reduxjs/toolkit";
import { BlogService } from "../../../network/services/BlogService";
import { BlogState } from "./type";
import Blog from "../../../network/models/BlogModel";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import { MyBlogService } from "../../../network/services/MyBlogsService";


const initialState: BlogState = {
    list: [],
    status: 'idle',
    error: null,
    selected: null
}

const blogService = new BlogService();
const myBlogsService = new MyBlogService()

export const addBlog = createAsyncThunk(
    "blog/writeBlog",
    async (blog: Blog) => {
        const response = await blogService.add(blog);
        return response.data;
    }
);


export const fetchPublishedBlogs = createAsyncThunk(
    "blog/fetchPublishedBlogs",
    async () => {
        const response = await blogService.getAll();
        return response.data;
    }
);


export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id: string) => {
        const response = await blogService.delete(id);
        return response.data;
    }
);

export const fetchBlog = createAsyncThunk(
    "blog/fetchBlog",
    async (id: string) => {
        const response = await blogService.get(id);
        return response.data;
    }
);

export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async (blog: Blog) => {
        const response = await blogService.update(blog._id, blog);
        return response.data;
    }
);


export const getMyBlogs = createAsyncThunk(
    "blog/getMyBlogs",
    async () => {
        const response = await myBlogsService.getAll();
        console.log("getMyBlogs response:", response);
        return response.data;
    }
);



const blogSlice = createBaseSlice<BlogState>("blog", initialState, [

    {
        thunk: addBlog,
        onFulfilled: (state, action) => state.list = action.payload,
    },

    {
        thunk: fetchPublishedBlogs,
        onFulfilled: (state, action) => {
            state.list = action.payload;
        },
    },

    {
        thunk: deleteBlog,
        onFulfilled: (state, action) => {
            state.list = state.list.filter(
                (blog) => blog._id !== action.payload
            );
        },
    },

    {
        thunk: fetchBlog,
        onFulfilled: (state, action) => {
            state.selected = action.payload;
        },
    },

    {
        thunk: updateBlog,
        onFulfilled: (state, action) => {
            if (action.payload) {
                state.list = state.list.map((blog) =>
                    blog._id === action.payload._id ? action.payload : blog
                );
            }
        },
    },
    {
        thunk: getMyBlogs,
        onFulfilled: (state, action) => {
            state.list = action.payload;

        },
    },

]);

export default blogSlice.reducer;