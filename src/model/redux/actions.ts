import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../dataService';
import { User } from '../types';

export const fetchUsers = createAsyncThunk('users/addUser', async () => {
	const userPromise = dataService({
		uri: '/users',
	});

	return (await userPromise) as Array<User>;
});
