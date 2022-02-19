import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../model/types';
import { selectUsers } from '../model/redux/userSlice';

export const UserList = () => {
	const users = useSelector(selectUsers);

	return (
		<div>
			<table>
				<thead>
					<tr key="header">
						<th>Id</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Date of Birth</th>
						<th>Industry</th>
						<th>Salary</th>
						<th>Years of Experience</th>
						<th>View</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: 'center' }}>
					{users.length !== 0 &&
						users.map((eachUser: User) => (
							<tr key={eachUser.id}>
								<td key="id">{eachUser.id}</td>
								<td key="first_name">{eachUser.first_name}</td>
								<td key="last_name">{eachUser.last_name}</td>
								<td key="email">{eachUser.email}</td>
								<td key="dob">{eachUser.date_of_birth}</td>
								<td key="industry">{eachUser.industry}</td>
								<td key="salary">{eachUser.salary}</td>
								<td key="exp">{eachUser.years_of_experience}</td>
								<td key="w">w</td>
								<td key="e">e</td>
								<td key="d">d</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};