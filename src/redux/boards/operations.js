import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi, setToken } from "../../config/mongo.js";
import toast from "react-hot-toast";


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


export const getBoardsThunk = createAsyncThunk(
  "getBoards",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (savedToken === null) {
      return thunkAPI.rejectWithValue("Token is not exist!");
    }
    try {
      setToken(savedToken);
      const { data } = await mongoApi.get("boards", savedToken);
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
