import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { User } from '../types';

export interface GlobalState {
	users: Array<User>;
}

export const globalState: GlobalState = { users: [] as Array<User> };

export const store = configureStore({
	reducer: {
		users: userSlice.reducer,
	},
	preloadedState: globalState,
});

export type AppDispatch = typeof store.dispatch;
