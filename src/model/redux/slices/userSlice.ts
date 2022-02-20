import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateUser } from '../actions';
import { RootState } from '../store';
import { User } from '../../User';

const usersAdapter = createEntityAdapter<User>();

const PENDING = 'pending';
const IDLE = 'idle';
const REJECTED = 'rejected';

const initialState = usersAdapter.getInitialState({
	status: IDLE,
});

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = IDLE;
				usersAdapter.upsertMany(state, action);
			})
			.addCase(fetchUsers.pending, (state) => {
				state.status = PENDING;
				return state;
			})
			.addCase(fetchUsers.rejected, (state) => {
				state.status = REJECTED;
				return state;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.status = IDLE;
				usersAdapter.upsertOne(state, action);
			})
			.addCase(updateUser.pending, (state) => {
				state.status = PENDING;
				return state;
			})
			.addCase(updateUser.rejected, (state) => {
				state.status = REJECTED;
				return state;
			});
	},
});

// selectors
export const {
	selectAll: selectUsers,
	selectIds: selectUserIds,
	selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export const isUserActionPending = (state: RootState) => state.users.status === PENDING;
export const didUserActionFail = (state: RootState) => state.users.status === REJECTED;
