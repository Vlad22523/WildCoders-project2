import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi, setToken } from "../../config/mongo.js";
import toast from "react-hot-toast";

export const createBoardThunk = createAsyncThunk(
  "boards/createBoard",
  async (body, thunkAPI) => {
    try {
      const response = await mongoApi.post("boards", body);
      toast.success("Successfully created board");
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
      toast.success("Successfully deleted board");
      return id;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBoardsThunk = createAsyncThunk(
  "getBoards",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;

    if (!savedToken) {
      toast.error("Authorization token is missing!");
      return thunkAPI.rejectWithValue("Token is missing");
    }

    try {
      setToken(savedToken);
      const { data } = await mongoApi.get("boards");
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
