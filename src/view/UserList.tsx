import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../model/User';
import { selectUsers } from '../model/redux/userSlice';
import { paths, USER_ID } from './App';

export const UserList = () => {
	const users = useSelector(selectUsers);

	// maybe replace the table with react virtualized table
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
								<td key="w">
									<Link to={paths.userDetails.replace(`:${USER_ID}`, eachUser.id.toString())}>view</Link>
								</td>
								<td key="e">
									<Link to={paths.editUser.replace(`:${USER_ID}`, eachUser.id.toString())}>edit</Link>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};
