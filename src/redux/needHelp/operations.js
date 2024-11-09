import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi } from "../../config/mongo.js";
import toast from "react-hot-toast";

export const submitHelpThunk = createAsyncThunk(
  "need-help",
  async (body, thunkAPI) => {
    try {
      const response = await mongoApi.post("need-help", body);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
