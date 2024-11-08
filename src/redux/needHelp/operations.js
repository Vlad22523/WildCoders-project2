import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi } from "../../config/mongo.js";

export const submitHelpThunk = createAsyncThunk(
  "need-help",
  async (body, thunkAPI) => {
    try {
      const response = await mongoApi.post("need-help", body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
