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

export const addCardThunk = createAsyncThunk(
  "cards/addCard",
  async ({ columnId, body }, thunkAPI) => {
    try {
      const { data } = await mongoApi.post(`cards/${columnId}`, body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCardThunk = createAsyncThunk(
  "cards/editCard",
  async ({ cardId, body }, thunkAPI) => {
    try {
      const { data } = await mongoApi.patch(`cards/v1/${cardId}`, body);
      return data;
    } catch (error) {
      console.error("Edit card error:", error); // Логирование ошибки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCardThunk = createAsyncThunk(
  "cards/deleteCards",
  async (cardId, thunkAPI) => {
    try {
      await mongoApi.delete(`cards/v1/${cardId}`);
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
