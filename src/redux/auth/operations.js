import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi, setToken } from "../../config/mongo.js";
import toast from "react-hot-toast";

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await mongoApi.post("auth/register", credentials);
      console.log("Response data:", data);
      setToken(data.data.user.accessToken);
      toast.success("Registration successful!");
      return data.data;
    } catch (error) {
      toast.error(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await mongoApi.post("auth/login", credentials);
      toast.success(`Login successfull!`);
      setToken(data.data.accessToken);
      return data.data;
    } catch (error) {
      toast.error(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
