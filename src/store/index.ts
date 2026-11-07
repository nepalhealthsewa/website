import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import uiReducer from './slices/uiSlice';
import toolsReducer from './slices/toolsSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer,
    tools: toolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
