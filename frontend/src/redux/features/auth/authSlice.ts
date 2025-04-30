import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginModel, AuthState } from "./type";
import http from "../../axiosBase";
import createBaseSlice from "../../../network/reducers/core/BaseSlice";
import { UserService } from "../../../network/services/UserService";

const initialState: AuthState = {
  list: null,
  isLoggedIn: false,
  result: {
    status: "idle",
    statusCode: 0,
    message: "",
    token: `${localStorage.getItem("token")}` || null,
  },
};

let userService = new UserService();

export const authLogin = createAsyncThunk(
  "auth/login",
  async (model: LoginModel, { rejectWithValue }) => {
    try {
      const response = await http.post("/auth/login", model);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authLogout = createAsyncThunk("auth/logout", async () => {
  return null;
});

// export const fetchUsers = createAsyncThunk(
//     "auth/fetchUsers",
//     async () => {
//         const response = await http.get("/auth/fetchUsers")
//         return response.data;
//     }
// );

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const response = await userService.getAll();
  return response.data;
});

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (id: string) => {
    const response = await userService.get(id);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id: string) => {
    const response = await userService.delete(id);
    return response.data;
  }
);

const authSlice = createBaseSlice<AuthState>("auth", initialState, [
  {
    thunk: authLogin,
    onFulfilled: (state, action) => {
      const { status, statusCode, message, token } = action.payload;
      state.result = { status, statusCode, message, token };
      if (token) {
        state.isLoggedIn = true;
      }
      localStorage.setItem("token", token);
    },
    onRejected: (state, action) => {
      state.result.status = "failed";
      state.result.message = action.payload.message;
      state.isLoggedIn = false;
    },
  },
  {
    thunk: authLogout,
    onFulfilled: (state) => {
      state.result.status = "idle";
      state.result.token = "";
      state.isLoggedIn = false;
    },
  },
  {
    thunk: fetchUsers,
    onFulfilled: (state, action) => {
      state.list = action.payload;
    },
  },

  {
    thunk: fetchUser,
    onFulfilled: (state, action) => {
      state.list = action.payload;
    },
  },

  {
    thunk: deleteUser,
    onFulfilled: (state, action) => {
      // state.list = (state.list || [])?.filter(
      //   (user: { _id: string }) => user._id !== action.payload
      // );
      if (state.list && state.list._id === action.payload) {
        state.list = null;
        state.isLoggedIn = false;
      }
    },
  },
]);

export default authSlice.reducer;
