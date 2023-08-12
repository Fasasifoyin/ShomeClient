import * as api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const signUp = createAsyncThunk(
  "/user/signUp",
  async (form, { rejectWithValue }) => {
    try {
      const { navigate } = form;
      const { data, status } = await api.signUp(form);
      if (status === 200) {
        const { firstName, lastName, email } = form;
        let text =
          "You are welcome on board. Here at Shome, we sell the best quality sneakers, heels and sandals";
        let subject = "Welcome to Shome";
        const { status } = await api.mail({
          email,
          firstName,
          lastName,
          text,
          subject,
        });
        if (status === 201) {
          toast.success("Sign up successful. An email has been sent");
        }
      }
      navigate("/");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "/user/signIn",
  async (form, { rejectWithValue }) => {
    try {
      const { navigate, redirect } = form;
      const { data, status } = await api.signIn(form);
      console.log(data)
      if (status === 200) {
        toast.success("Sign in Successful");
        navigate(redirect);
      }
      return data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const update = createAsyncThunk(
  "/user/update",
  async (form, { rejectWithValue }) => {
    try {
      const { data, status } = await api.update(form);
      if (status === 200) {
        toast.success("Your account details have been updated");
      }
      return data;
    } catch (error) {
      console.log(error.error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const change = createAsyncThunk(
  "/user/change",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.change(form);
      toast.success(data.message);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const generate = createAsyncThunk(
  "/user/generate",
  async (form, { rejectWithValue }) => {
    try {
      const { navigate } = form;
      const { data, status } = await api.generate(form);
      console.log(data);
      if (status === 200) {
        const { email, code } = data;
        const { data: response } = await api.getUser(email);
        const { firstName, lastName } = response;
        let text = `Your OTP is ${code}`;
        let subject = "Password Recovery";
        const { status } = await api.mail({
          email,
          firstName,
          lastName,
          text,
          subject,
        });
        if (status === 201) {
          toast.success("An OTP has been sent to your email");
        }
      }
      navigate("/verify");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verify = createAsyncThunk(
  "/user/verify",
  async (form, { rejectWithValue }) => {
    try {
      const { navigate } = form;
      const { data } = await api.verify(form);
      toast.success(data?.message);
      navigate("/reset");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const reset = createAsyncThunk(
  "/user/reset",
  async (form, { rejectWithValue }) => {
    try {
      const { navigate } = form;
      const { data, status } = await api.reset(form);
      if (status === 201) {
        const { email } = form;
        const { data: response } = await api.getUser(email);
        const { firstName, lastName } = response;
        let subject = "Password reset";
        let text = `Your password has been reset successfully. You can now login with your new password`;
        const { status } = await api.mail({
          email,
          firstName,
          lastName,
          text,
          subject,
        });
        if (status === 201) {
          toast.success(data?.message);
        }
      }
      navigate("/signin");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/allUser/getAllUsers",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.getAllUsers();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "/allUser/editUser",
  async (form, { rejectWithValue }) => {
    try {
      const { setSubmitting, setShowEdit } = form;
      const { data, status } = await api.editUser(form);
      if (status === 200) {
        setSubmitting(false);
        setShowEdit(-1);
      }
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
