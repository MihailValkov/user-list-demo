import { type AnyAction, configureStore, type ThunkDispatch } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userReducer } from './users/slice';

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

/* Types */
export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<AppRootState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppRootState> = useSelector;
