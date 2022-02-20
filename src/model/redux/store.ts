import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import {industrySlice} from './slices/industrySlice';
import {experienceSlice} from './slices/experienceSlice';

export const store = configureStore({
	reducer: {
		users: userSlice.reducer,
		industries: industrySlice.reducer,
		experience: experienceSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
