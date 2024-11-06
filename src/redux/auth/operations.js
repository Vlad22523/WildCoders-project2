import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, mongoApi, setToken } from "../../config/mongo.js";
import toast from "react-hot-toast";

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await mongoApi.post("auth/register", credentials, {
        withCredentials: true,
      });
      setToken(data.data.user.accessToken);
      toast.success("Registration successful!");
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await mongoApi.post("auth/login", credentials, {
        withCredentials: true,
      });
      toast.success(`Login successfull!`);
      setToken(data.data.accessToken);
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await mongoApi.post("auth/logout", {
      withCredentials: true,
    });
    toast.success(`Logout successfull!`);
    clearToken();
  } catch (error) {
    const errorMessage = error.response?.data?.data.message || error.message;
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchUserThunk = createAsyncThunk(
  "getUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await mongoApi.get("auth/user", {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const saveThemeThunk = createAsyncThunk(
  "saveTheme",
  async (theme, thunkAPI) => {
    try {
      await mongoApi.patch(
        "auth/user",
        { theme },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserThunk = createAsyncThunk(
  "updateUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await mongoApi.patch("auth/user", formData, {
        withCredentials: true,
      });
      toast.success("Profile updated successfully!");
      return data.data;
    } catch (error) {
      const errorMessage = error.response?.data?.data.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
