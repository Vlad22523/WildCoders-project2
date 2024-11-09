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
      const response = await mongoApi.post("boards", body);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBoardThunk = createAsyncThunk(
  "boards/updateBoard",
  async ({ _id, updatedData }, thunkAPI) => {
    try {
      const response = await mongoApi.patch(`boards/${_id}`, updatedData);
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
