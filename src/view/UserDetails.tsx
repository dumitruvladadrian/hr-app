import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { paths, USER_ID } from './App';
import { selectUserById, selectUserIds } from '../model/redux/slices/userSlice';
import { UNKNOWN_USER_ID, User, validateUserId } from '../model/User';
import { RootState } from '../model/redux/store';

export const UserDetails = () => {
	const params = useParams();
	const userIds: Array<number | string> = useSelector(selectUserIds);

	const userId: number = validateUserId(params[USER_ID], userIds);
	const user: User | undefined = useSelector((state: RootState) => selectUserById(state, userId));

	return userId === UNKNOWN_USER_ID ? (
		<div>
			<Link to={paths.userList}>{'<- User List'}</Link>
			<br />
			<br />
			No such user found.
		</div>
	) : (
		<div>
			<Link to={paths.editUser.replace(`:${USER_ID}`, userId.toString())}>Edit user</Link>
			<br />
			<br />
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
