import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit/src/entities/models';
import { USER_ID } from './App';
import { User } from '../model/types';
import { RootState } from '../model/redux/store';
import { selectUserById } from '../model/redux/userSlice';

export const EditUser = () => {
	const params = useParams();
	const userId: EntityId = params[USER_ID] || 'unknown';
	const user: User | undefined = useSelector((state: RootState) => selectUserById(state, userId));

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [industry, setIndustry] = useState('');
	const [salary, setSalary] = useState('');
	const [yearsOfExperience, setYearsOfExperience] = useState('');

	useEffect(() => {
		if (user !== undefined) {
			setFirstName(user.first_name);
			setLastName(user.last_name);
			setEmail(user.email);
			setDateOfBirth(user.date_of_birth);
			setIndustry(user.industry);
			setSalary(user.salary.toString());
			setYearsOfExperience(user.years_of_experience.toString());
		}
	}, [user]);

	const saveUser = () => {

	};

	return (
		<div>
			<table>
				<tbody style={{ textAlign: 'left' }}>
					<tr>
						<td style={{ width: '200px' }}> User Id</td>
						<td> {userId}</td>
					</tr>
					<tr>
						<td> First name:</td>
						<td>
							<input style={{width: '500px'}} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						</td>
					</tr>
					<tr>
						<td> Lats name:</td>
						<td>
							<input style={{width: '500px'}} value={lastName} onChange={(e) => setLastName(e.target.value)} />
						</td>
					</tr>
					<tr>
						<td> email:</td>
						<td>
							<input style={{width: '500px'}} value={email} onChange={(e) => setEmail(e.target.value)} />
						</td>
					</tr>
					<tr>
						<td> Date of birth:</td>
						<td>
							<input style={{width: '500px'}} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
						</td>
					</tr>
					<tr>
						<td> Industry:</td>
						<td>
							<input style={{width: '500px'}} value={industry} onChange={(e) => setIndustry(e.target.value)} />
						</td>
					</tr>
					<tr>
						<td> Salary:</td>
						<td>
							<input style={{width: '500px'}} value={salary} onChange={(e) => setSalary(e.target.value.toString())} />
						</td>
					</tr>
					<tr>
						<td> Years of experience:</td>
						<td>
							<input style={{width: '500px'}} value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value.toString())} />
						</td>
					</tr>
				</tbody>
			</table>
			<button onClick={() => saveUser()}>Save</button>
		</div>
	);
};
