import React from 'react';
import { useSelector } from 'react-redux';
import { Dictionary } from '@reduxjs/toolkit';
import { selectIndustries } from '../model/redux/slices/industrySlice';
import { selectUsers } from '../model/redux/slices/userSlice';
import { User } from '../model/User';
import { Experience } from '../model/redux/slices/experienceSlice';

interface allSalariesPerExpPerInd {
	// {industry: {yearsOfExperience: Array<Salary>}}
	[key: string]: { [key: string]: Array<number> };
}

// export for testing
export const computeData = (users: Array<User>, industries: Dictionary<Experience>) => {
	const partialData: allSalariesPerExpPerInd = {};
	if (users.length !== 0 && industries) {
		Object.keys(industries).forEach((industryName) => {
			if (industries[industryName] && industries[industryName]?.userIds) {
				industries[industryName]?.userIds?.forEach((userId: number) => {
					if (!partialData[industryName]) {
						Object.assign(partialData, { [industryName]: [] });
					}

					const usersYearsOfExperience = Math.floor(users[userId - 1].years_of_experience);

					if (partialData[industryName][usersYearsOfExperience]) {
						partialData[industryName][usersYearsOfExperience].push(users[userId - 1].salary);
					} else {
						partialData[industryName] = Object.assign(partialData[industryName], {
							[usersYearsOfExperience]: [users[userId - 1].salary],
						});
					}
				});
			}
		});
	}

	// cleanup partialData
	delete partialData.null;

	const result: Array<{
		industry: string;
		yearsOfExperience: string;
		averageSalary: number;
	}> = [];

	Object.keys(partialData).forEach((industry) => {
		Object.keys(partialData[industry]).forEach((yearsOfExperience) => {
			const averageSalary = Math.floor(
				partialData[industry][yearsOfExperience].reduce(
					(partialSum, salary) => partialSum + salary,
					0
				) / partialData[industry][yearsOfExperience].length
			);

			result.push({
				industry,
				yearsOfExperience,
				averageSalary,
			});
		});
	});

	return result.sort((first, second) => second.averageSalary - first.averageSalary);
};

export const ExperiencePerIndustryChart = () => {
	const industries = useSelector(selectIndustries);
	const users = useSelector(selectUsers);

	const data = computeData(users, industries);

	return (
		<div className="user-list-container">
			Salary per Experience per industry chart (high earners):
			<br/>
			<br/>
			<div>
				<table className="table">
					<thead>
						<tr key="header">
							<th style={{ width: '466px' }}>Industry</th>
							<th style={{ width: '200px' }}>Years of experience</th>
							<th style={{ width: '120px' }}>Salary</th>
						</tr>
					</thead>
				</table>
			</div>
			<div className="table-div">
				<table className="table">
					<tbody>
						{data.length !== 0 &&
							data.map((row) => (
								<tr key={row.industry + row.yearsOfExperience}>
									<td key="industry">{row.industry}</td>
									<td style={{ width: '200px' }} key="yearsOfExperience">
										{row.yearsOfExperience}
									</td>
									<td key="salary">{row.averageSalary}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
