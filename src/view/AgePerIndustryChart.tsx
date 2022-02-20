import React from 'react';
import { useSelector } from 'react-redux';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { selectIndustries } from '../model/redux/industrySlice';
import { selectUsers } from '../model/redux/userSlice';

interface ChartDataPoint {
	name: string;
	averageAge: number;
}

export const AgePerIndustryChart = () => {
	const industries = useSelector(selectIndustries);
	const users = useSelector(selectUsers);

	// TODO move transformation to action
	const dobToAge = (dob: string) => {
		const parts = dob.split('/');
		const birthday = new Date(
			parseInt(parts[2], 10),
			parseInt(parts[1], 10) - 1,
			parseInt(parts[0], 10)
		);
		const ageInMillis = Date.now() - birthday.getTime();
		return Math.floor(ageInMillis / 31536000000);
	};

	const computeData = () => {
		const data = [] as Array<ChartDataPoint>;
		if (users.length !== 0 && industries) {
			Object.keys(industries).forEach((industryName) => {
				if (industries[industryName] && industries[industryName]?.userIds) {
					let totalAge = 0;
					industries[industryName]?.userIds?.forEach((userId: number) => {
						totalAge += dobToAge(users[userId - 1].date_of_birth);
						return totalAge;
					});

					data.push({
						name: industryName,
						// @ts-ignore
						averageAge: totalAge / industries[industryName]?.userIds.length,
					});
				}
			});
		}

		data.sort((first, second) => first.averageAge - second.averageAge);
		return data;
	};

	return (
		<div>
			this is the age per industry chart:
			<br />
			<div style={{ width: 1500, height: '80vh' }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						width={500}
						height={300}
						data={computeData()}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" angle={-70} textAnchor="end" height={500} interval={0} />
						<YAxis dataKey="averageAge" />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="averageAge" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
