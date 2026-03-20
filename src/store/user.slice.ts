import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios from "axios";
import { PREFIX } from "../helpers/API";
import type { LoginResponse } from "../interfaces/auth.interface";
import type { IProfile } from "../interfaces/user.interface";
import type { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  profile?: IProfile;
}

export interface IUserPersistentState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.response?.data.message);
      }
    }
  },
);

export const getProfile = createAsyncThunk<
  IProfile,
  void,
  { state: RootState }
>("user/getProfile", async (_, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;
  console.log(jwt);
  const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
