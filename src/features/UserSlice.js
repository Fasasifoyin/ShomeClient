import { createSlice } from "@reduxjs/toolkit";
import {
  change,
  generate,
  reset,
  signIn,
  signUp,
  update,
  verify,
} from "../actions/User";

const initialState = {
  user: localStorage.getItem("shomeUser")
    ? JSON.parse(localStorage.getItem("shomeUser"))
    : {},
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state, action) => {
      localStorage.removeItem("shomeUser");
      return {
        ...state,
        user: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("shomeUser", JSON.stringify(action?.payload));
        return {
          ...state,
          status: "success",
          user: action.payload,
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(signIn.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action.payload)
        localStorage.setItem("shomeUser", JSON.stringify(action?.payload));
        return {
          ...state,
          status: "success",
          user: action.payload,
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(update.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(update.fulfilled, (state, action) => {
        localStorage.setItem("shomeUser", JSON.stringify(action?.payload));
        return {
          ...state,
          status: "success",
          user: action.payload,
        };
      })
      .addCase(update.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(change.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(change.fulfilled, (state, action) => {
        return {
          ...state,
          status: "success",
        };
      })
      .addCase(change.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(generate.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
          error: "",
        };
      })
      .addCase(generate.fulfilled, (state, action) => {
        localStorage.setItem(
          "generate",
          JSON.stringify(action?.payload?.email)
        );
        return {
          ...state,
          status: "success",
          error: "",
        };
      })
      .addCase(generate.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(verify.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(verify.fulfilled, (state, action) => {
        localStorage.setItem("flag", JSON.stringify(action?.payload?.flag));
        return {
          ...state,
          status: "success",
        };
      })
      .addCase(verify.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      })
      .addCase(reset.pending, (state, action) => {
        return {
          ...state,
          status: "pending",
        };
      })
      .addCase(reset.fulfilled, (state, action) => {
        localStorage.removeItem("generate");
        localStorage.removeItem("flag");
        return {
          ...state,
          status: "success",
        };
      })
      .addCase(reset.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.payload,
        };
      });
  },
});

export const { changeError, logout } = userSlice.actions;
export const selectedUser = (state) => state.auth.user;
export const Status = (state) => state.auth.status;
export const Error = (state) => state.auth.error;

export default userSlice.reducer;
