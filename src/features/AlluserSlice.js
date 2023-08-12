import { createSlice } from "@reduxjs/toolkit";
import { editUser, getAllUsers } from "../actions/User";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    changeError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        return {
          ...state,
          status: "success",
          users: action.payload,
        };
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(editUser.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(editUser.fulfilled, (state, action) => {
        return {
          ...state,
          status: "success",
          users: state.users.map((each) =>
            each._id === action.payload?._id ? action.payload : each
          ),
        };
      })
      .addCase(editUser.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      });
  },
});

export const AllUsers = (state) => state.users.users;
export const Error = (state) => state.users.error;
export const Status = (state) => state.users.status;

export const { changeError } = allUserSlice.actions;

export default allUserSlice.reducer;
