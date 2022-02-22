import React from 'react';
import { useSelector } from 'react-redux';
import { Dictionary } from '@reduxjs/toolkit';
import { selectUsers } from '../model/redux/slices/userSlice';
import {Chart, ChartDataPoint} from './components/Chart';
import { Experience, selectExperience } from '../model/redux/slices/experienceSlice';
import { User } from '../model/User';

// export for testing
export const computeData = (users: Array<User>, experience: Dictionary<Experience>) => {
	const data = [] as Array<ChartDataPoint>;
	if (users.length !== 0 && experience) {
		Object.keys(experience).forEach((industryName) => {
			if (experience[industryName] && experience[industryName]?.userIds) {
				let total = 0;
				experience[industryName]?.userIds?.forEach((userId: number) => {
					total += users[userId - 1].salary;
					return total;
				});

				data.push({
					name: industryName,
					// @ts-ignore
					average: total / experience[industryName]?.userIds.length,
				});
			}
		});
	}

	return data;
};

export const SalaryPerExperienceChart = () => {
	const experience = useSelector(selectExperience);
	const users = useSelector(selectUsers);

	return (
		<div className="user-list-container">
			Salary per years of experience chart:
			<Chart computeData={() => computeData(users, experience)} />
		</div>
	);
};
