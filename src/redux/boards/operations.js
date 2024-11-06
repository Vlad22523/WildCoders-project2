import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi } from "../../config/mongo.js";

export const createBoardThunk = createAsyncThunk(
  "boards/createBoard",
  async (body, thunkAPI) => {
    try {
      console.log(body);
      console.log("URL:", mongoApi.defaults.baseURL + "boards");

      const response = await mongoApi.post("boards", body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
