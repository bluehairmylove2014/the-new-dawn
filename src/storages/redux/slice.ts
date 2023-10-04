"use client";
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { currencyType, languageType } from "./types";

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<currencyType>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<languageType>) => {
      state.language = action.payload;
    },
  },
});

export const { setCurrency, setLanguage } = appSlice.actions;
