import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Industry {
	id: string;
	userIds: Array<number>;
}

const industryAdaptor = createEntityAdapter<Industry>();

const initialState = industryAdaptor.getInitialState({
	status: 'idle',
});

export const industrySlice = createSlice({
	name: 'industries',
	initialState,
	reducers: {
		industriesLoaded: industryAdaptor.addMany,
	},
});

// selectors
export const { selectEntities: selectIndustries } = industryAdaptor.getSelectors(
	(state: RootState) => state.industries
);
