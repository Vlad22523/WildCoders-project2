import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi } from "../../config/mongo.js";
import toast from "react-hot-toast";

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

export const fetchAddColumn = createAsyncThunk(
  "addColumn",
  async ({ body, boardId }, thunkAPI) => {
    console.log(body);
    try {
      const { data } = await mongoApi.post(`columns/${boardId}`, body, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk(
  "deleteColumn",
  async (id, thunkAPI) => {
    try {
      await mongoApi.delete(`columns/v1/${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPatchColumn = createAsyncThunk(
  "patchColumn",
  async ({ body, id }, thunkAPI) => {
    try {
      const { data } = await mongoApi.patch(`columns/v1/${id}`, body);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
