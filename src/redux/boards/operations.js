import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi } from "../../config/mongo.js";

export const createBoardThunk = createAsyncThunk(
  "boards/createBoard",
  async (body, thunkAPI) => {
    try {
      //   const token = localStorage.getItem("authToken");
      //   console.log("Token:", token);
      //   if (!token) {
      //     return thunkAPI.rejectWithValue("Authorization token is missing");
      //   }
      console.log(body);
      console.log("URL:", mongoApi.defaults.baseURL + "boards");

      const response = await mongoApi.post("boards", body);
      console.log("Created board data:", response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBoardThunk = createAsyncThunk(
  "boards/updateBoard",
  async ({ id, body }, thunkAPI) => {
    try {
      const response = await mongoApi.patch(`boards/${id}`, body);
      console.log("Created board data:", response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoardThunk = createAsyncThunk(
  "boards/deleteBoard",
  async (id, thunkAPI) => {
    try {
      await mongoApi.delete(`boards/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
