import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit/src/entities/models';
import { USER_ID } from './App';
import { selectUserById } from '../model/redux/userSlice';
import { User } from '../model/types';
import { RootState } from '../model/redux/store';

export const UserDetails = () => {
	const params = useParams();

	const userId: EntityId = params[USER_ID] || 'unknown';
	const user: User | undefined = useSelector((state: RootState) => selectUserById(state, userId));

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
						<td> {user?.first_name}</td>
					</tr>
					<tr>
						<td> Lats name:</td>
						<td> {user?.last_name}</td>
					</tr>
					<tr>
						<td> email:</td>
						<td> {user?.email}</td>
					</tr>
					<tr>
						<td> Date of birth:</td>
						<td> {user?.date_of_birth}</td>
					</tr>
					<tr>
						<td> Industry:</td>
						<td> {user?.industry}</td>
					</tr>
					<tr>
						<td> Salary:</td>
						<td> {user?.salary}</td>
					</tr>
					<tr>
						<td> Years of experience:</td>
						<td> {user?.years_of_experience}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
