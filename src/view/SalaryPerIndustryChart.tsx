import React from 'react';
import { useSelector } from 'react-redux';
import { selectIndustries } from '../model/redux/industrySlice';
import { selectUsers } from '../model/redux/userSlice';
import { Chart } from './components/Chart';

interface ChartDataPoint {
	name: string;
	average: number;
}

export const SalaryPerIndustryChart = () => {
	const industries = useSelector(selectIndustries);
	const users = useSelector(selectUsers);

	const computeData = () => {
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

	return (
		<div>
			Salary per industry chart:
			<Chart computeData={computeData} />
		</div>
	);
};
