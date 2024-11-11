import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi } from "../../config/mongo.js";

export const fetchColumnsThunk = createAsyncThunk(
  "columns/getColumns",
  async (boardId, thunkAPI) => {
    try {
      const { data } = await mongoApi.get(`columns/${boardId}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
