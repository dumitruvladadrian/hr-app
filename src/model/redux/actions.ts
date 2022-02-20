import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataService } from '../dataService';
import { User } from '../User';
import { dobToAge, groupUsersByValuesOfKey } from './dataSplittingUtils';
import { industrySlice } from './industrySlice';
import { experienceSlice } from './experienceSlice';

export const fetchUsers = createAsyncThunk('users/listUsers', async (_, thunkApi) => {
	const userPromise = dataService<Array<User>>({
		uri: '/users',
	});

	const users = (await userPromise) as Array<User>;
	// store age in the redux store, no point in computing it each time
	users.map((user) => Object.assign(user, { age: dobToAge(user.date_of_birth) }));

	thunkApi.dispatch(
		industrySlice.actions.industriesLoaded(groupUsersByValuesOfKey(users, 'industry', (val) => val))
	);
	thunkApi.dispatch(
		experienceSlice.actions.experienceLoaded(
			groupUsersByValuesOfKey(users, 'years_of_experience', (val) => {
				const safeVal = val ? val.toString() : '0';
				return Math.floor(parseFloat(safeVal)).toString();
			})
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
