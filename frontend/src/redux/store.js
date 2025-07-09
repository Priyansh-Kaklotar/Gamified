import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeslice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
