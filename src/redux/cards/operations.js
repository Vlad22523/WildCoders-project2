import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi } from "../../config/mongo.js";

export const fetchCardsThunk = createAsyncThunk(
  "cards/getCards",
  async (columnId, thunkAPI) => {
    try {
      const { data } = await mongoApi.get(`cards/${columnId}`);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
