import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { paths, USER_ID } from './App';
import { createUser, UNKNOWN_USER_ID, User, validateUserId } from '../model/User';
import { RootState } from '../model/redux/store';
import { selectUserById, selectUserIds } from '../model/redux/userSlice';
import { NumericInput } from './NumericInput';
import {fetchUsers, updateUser} from '../model/redux/actions';

export const EditUser = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const userIds: Array<number | string> = useSelector(selectUserIds);

	const userId: number = validateUserId(params[USER_ID], userIds);
	const user: User | undefined = useSelector((state: RootState) => selectUserById(state, userId));

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [industry, setIndustry] = useState('');
	const [salary, setSalary] = useState(0);
	const [yearsOfExperience, setYearsOfExperience] = useState(0);

	useEffect(() => {
		if (user !== undefined) {
			setFirstName(user.first_name);
			setLastName(user.last_name);
			setEmail(user.email);
			setDateOfBirth(user.date_of_birth);
			setIndustry(user.industry);
			setSalary(user.salary);
			setYearsOfExperience(user.years_of_experience);
		}
	}, [user]);

	const saveChanges = () => {
		dispatch(
			updateUser(
				createUser(
					userId,
					firstName,
					lastName,
					email,
					dateOfBirth,
					industry,
					salary,
					yearsOfExperience
				)
			)
		);
		dispatch(fetchUsers());
	};

	return userId === UNKNOWN_USER_ID ? (
		<div>
			<Link to={paths.userList}>{'<- User List'}</Link>
			<br />
			<br />
			No such user found.
		</div>
	) : (
		<div>
			<Link to={paths.userDetails.replace(`:${USER_ID}`, userId.toString())}>User details</Link>
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
						<td>
							<input
								style={{ width: '500px' }}
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td> Lats name:</td>
						<td>
							<input
								style={{ width: '500px' }}
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td> email:</td>
						<td>
							<input
								style={{ width: '500px' }}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td> Date of birth:</td>
						<td>
							<input
								style={{ width: '500px' }}
								value={dateOfBirth}
								onChange={(e) => setDateOfBirth(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td> Industry:</td>
						<td>
							<input
								style={{ width: '500px' }}
								value={industry}
								onChange={(e) => setIndustry(e.target.value)}
							/>
						</td>
					</tr>
					<tr>
						<td> Salary:</td>
						<td>
							<NumericInput value={salary} setValue={setSalary} />* max 3 decimal points allowed
						</td>
					</tr>
					<tr>
						<td> Years of experience:</td>
						<td>
							<NumericInput value={yearsOfExperience} setValue={setYearsOfExperience} />* max 3
							decimal points allowed
						</td>
					</tr>
				</tbody>
			</table>
			<button onClick={() => saveChanges()}>Save</button>
		</div>
	);
};
