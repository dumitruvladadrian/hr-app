import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './actions';
import {RootState} from './store';
import {User} from '../User';

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState({
	status: 'idle',
});

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, usersAdapter.upsertMany);
	},
});

// selectors
export const { selectAll: selectUsers, selectIds: selectUserIds, selectById: selectUserById } = usersAdapter.getSelectors(
	(state: RootState) => state.users
);
