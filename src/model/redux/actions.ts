import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../dataService';
import { User } from '../User';

export const fetchUsers = createAsyncThunk('users/listUsers', async () => {
	const userPromise = dataService<Array<User>>({
		uri: '/users',
	});

	return (await userPromise) as Array<User>;
});

export const updateUser = createAsyncThunk('users/updateUser', async (data: User) => {
	const userPromise = dataService<Array<User>>({
		uri: `/users/${data.id}`,
		verb: 'PUT',
		data
	});

	return (await userPromise) as Array<User>;
});
