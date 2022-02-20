import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Experience {
	id: string;
	userIds: Array<number>;
}

const experienceAdaptor = createEntityAdapter<Experience>();

const initialState = experienceAdaptor.getInitialState({
	status: 'idle',
});

export const experienceSlice = createSlice({
	name: 'experience',
	initialState,
	reducers: {
		experienceLoaded: experienceAdaptor.addMany,
	},
});

// selectors
export const { selectEntities: selectExperience } = experienceAdaptor.getSelectors(
	(state: RootState) => state.experience
);
