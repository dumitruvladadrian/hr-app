import React from 'react';
import { useSelector } from 'react-redux';
import { Dictionary } from '@reduxjs/toolkit';
import { selectIndustries } from '../model/redux/slices/industrySlice';
import { selectUsers } from '../model/redux/slices/userSlice';
import { Chart } from './components/Chart';
import { User } from '../model/User';
import { Experience } from '../model/redux/slices/experienceSlice';

interface ChartDataPoint {
	name: string;
	average: number;
}

// export for testing
export const computeData = (users: Array<User>, industries: Dictionary<Experience>) => {
	const data = [] as Array<ChartDataPoint>;
	if (users.length !== 0 && industries) {
		Object.keys(industries).forEach((industryName) => {
			if (industries[industryName] && industries[industryName]?.userIds) {
				let total = 0;
				industries[industryName]?.userIds?.forEach((userId: number) => {
					total += users[userId - 1].salary;
					return total;
				});

				data.push({
					name: industryName,
					// @ts-ignore
					average: total / industries[industryName]?.userIds.length,
				});
			}
		});
	}

	data.sort((first, second) => first.average - second.average);
	return data;
};

export const SalaryPerIndustryChart = () => {
	const industries = useSelector(selectIndustries);
	const users = useSelector(selectUsers);

	return (
		<div className="user-list-container">
			Salary per industry chart:
			<Chart computeData={() => computeData(users, industries)} />
		</div>
	);
};
