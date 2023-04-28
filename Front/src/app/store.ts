/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
