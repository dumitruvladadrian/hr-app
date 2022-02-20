import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import {industrySlice} from './industrySlice';
import {experienceSlice} from './experienceSlice';

export const store = configureStore({
	reducer: {
		users: userSlice.reducer,
		industries: industrySlice.reducer,
		experience: experienceSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
