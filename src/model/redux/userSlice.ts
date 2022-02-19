import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './actions';
import { User } from '../types';

export const userSlice = createSlice({
	name: 'users',
	initialState: [] as Array<User>,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			return Object.assign(state, action.payload);
		});
	},
});
