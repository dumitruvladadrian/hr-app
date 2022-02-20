import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import {industrySlice} from './industrySlice';

export const store = configureStore({
	reducer: {
		users: userSlice.reducer,
		industries: industrySlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
