import React from 'react';
import { useSelector } from 'react-redux';
import { selectIndustries } from '../model/redux/slices/industrySlice';
import { selectUsers } from '../model/redux/slices/userSlice';
import { Chart } from './components/Chart';

interface ChartDataPoint {
	name: string;
	average: number;
}

export const AgePerIndustryChart = () => {
	const industries = useSelector(selectIndustries);
	const users = useSelector(selectUsers);

	const computeData = () => {
		const data = [] as Array<ChartDataPoint>;
		if (users.length !== 0 && industries) {
			Object.keys(industries).forEach((industryName) => {
				if (industries[industryName] && industries[industryName]?.userIds) {
					let totalAge = 0;
					industries[industryName]?.userIds?.forEach((userId: number) => {
						totalAge += users[userId - 1].age;
						return totalAge;
					});

					data.push({
						name: industryName,
						// @ts-ignore
						average: totalAge / industries[industryName]?.userIds.length,
					});
				}
			});
		}

		data.sort((first, second) => first.average - second.average);
		return data;
	};

	return (
		<div>
			Age per industry chart:
			<Chart computeData={computeData} />
		</div>
	);
};
