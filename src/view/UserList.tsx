import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../model/User';
import {
	didUserActionFail,
	isUserActionPending,
	selectUsers,
} from '../model/redux/slices/userSlice';
import { paths, USER_ID } from './App';

export const UserList = () => {
	const users = useSelector(selectUsers);
	const usersFetchingPending = useSelector(isUserActionPending);
	const usersFetchingFailed = useSelector(didUserActionFail);

	if (usersFetchingFailed) {
		return <p>Ups, there was an error connecting the server..</p>;
	} else if (usersFetchingPending) {
		return <p>Hold on a sec, loading data...</p>;
	}

	// maybe replace the table with react virtualized table
	return (
		<div className="user-list-container">
			<div>
				<table className="table">
					<thead>
						<tr key="header">
							<th style={{width: '54px'}}>Id</th>
							<th style={{width: '110px'}}>First Name</th>
							<th style={{width: '100px'}}>Last Name</th>
							<th style={{width: '255px'}}>Email</th>
							<th style={{width: '90px'}}>Date of Birth</th>
							<th style={{width: '465px'}}>Industry</th>
							<th style={{width: '90px'}}>Salary</th>
							<th style={{width: '215px'}}>Years of Experience</th>
							<th style={{width: '50px'}}>View</th>
							<th style={{width: '50px'}}>Edit</th>
						</tr>
					</thead>
				</table>
			</div>
			<div className="table-div">
				<table className="table">
					<tbody>
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
									<td key="exp" style={{width: '200px'}}>{eachUser.years_of_experience}</td>
									<td key="w">
										<Link to={paths.userDetails.replace(`:${USER_ID}`, eachUser.id.toString())}>
											view
										</Link>
									</td>
									<td key="e">
										<Link to={paths.editUser.replace(`:${USER_ID}`, eachUser.id.toString())}>
											edit
										</Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
