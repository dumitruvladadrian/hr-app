import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../dataService';
import { User } from '../User';
import {dobToAge, experienceValueProcessor, groupUsersByValuesOfKey} from './dataSplittingUtils';
import { industrySlice } from './slices/industrySlice';
import { experienceSlice } from './slices/experienceSlice';

export const fetchUsers = createAsyncThunk('users/listUsers', async (_, thunkApi) => {
	const userPromise = dataService<Array<User>>({
		uri: '/users',
	});

	const users = (await userPromise) as Array<User>;
	// store age in the redux store, no point in computing it each time
	users.map((user) => Object.assign(user, { age: dobToAge(user.date_of_birth) }));

	// split the data into different slices in the store, in order to save some computing resources when computing data for the charts
	thunkApi.dispatch(
		industrySlice.actions.industriesLoaded(groupUsersByValuesOfKey(users, 'industry', (val) => val))
	);
	thunkApi.dispatch(
		experienceSlice.actions.experienceLoaded(
			groupUsersByValuesOfKey(users, 'years_of_experience', experienceValueProcessor)
		)
	);
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
