import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../dataService';
import { User } from '../User';
import {groupUsersByValuesOfKey} from './dataSplittingUtils';
import {industrySlice} from './industrySlice';

export const fetchUsers = createAsyncThunk('users/listUsers', async (_, thunkApi) => {
	const userPromise = dataService<Array<User>>({
		uri: '/users',
	});

	const users = (await userPromise) as Array<User>;
	thunkApi.dispatch(industrySlice.actions.industriesLoaded(groupUsersByValuesOfKey(users, 'industry')));
	return users;
});

export const updateUser = createAsyncThunk('users/updateUser', async (data: User) => {
	const userPromise = dataService<User>({
		uri: `/users/${data.id}`,
		verb: 'PUT',
		data
	});

	return (await userPromise) as User;
});
