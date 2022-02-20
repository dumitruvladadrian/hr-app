import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../model/redux/slices/userSlice';
import { Chart } from './components/Chart';
import { selectExperience } from '../model/redux/slices/experienceSlice';

interface ChartDataPoint {
	name: string;
	average: number;
}

export const SalaryPerExperienceChart = () => {
	const experience = useSelector(selectExperience);
	const users = useSelector(selectUsers);

	const computeData = () => {
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

		data.sort((first, second) => first.average - second.average);
		return data;
	};

	return (
		<div>
			Salary per years of experience chart:
			<Chart computeData={computeData} />
		</div>
	);
};
