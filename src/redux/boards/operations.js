import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongoApi, setToken } from "../../config/mongo.js";

// export const createBoardThunk = createAsyncThunk(
//   "boards/createBoard",
//   async (body, thunkAPI) => {
//     try {
//       console.log(body);
//       console.log("URL:", mongoApi.defaults.baseURL + "boards");

//       const response = await mongoApi.post("boards", body);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
      // const errorMessage = error.response?.data?.data.message || error.message;
      // toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
