import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {selectUsers} from '../model/redux/userSlice';
import {fetchUsers} from '../model/redux/actions';

const ChartsContainer = ({users, dispatch}) => {

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const dobToAge = (dob) => {
		// TODO check if dob is valid
		const parts = dob.split('/');
		const birthday = new Date(parts[2], parts[1] - 1, parts[0]);
		const ageInMillis = Date.now() - birthday.getTime();
		return Math.floor(ageInMillis / 31536000000);
	};

	const extractKeys = (user) => ({industry: user.industry, age: dobToAge(user.date_of_birth)});
	const groupUniqueKeys = (array) => {
		const acc = {};
		array.forEach((obj) => {
			const industry = obj.industry;
			const age = obj.age;
			if (!acc[industry]) {
				acc[industry] = {sum: age, count: 1};
			} else {
				acc[industry].sum += age;
				acc[industry].count += 1;
			}
		});
		const result = [];
		Object.keys(acc).forEach((key) => result.push(
			{
				name: key,
				age: acc[key].sum / acc[key].count
			}));

		return result;
	};

	let data = groupUniqueKeys(users.map(extractKeys));

	return (
		<div>
			this is the age per industry chart:
			<br/>
			<div style={{width: 1500, height: '80vh'}}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3"/>
						<XAxis dataKey="name" angle={-70} textAnchor="end" height={500} interval={0}/>
						<YAxis/>
						<Tooltip/>
						<Legend />
						<Line type="monotone" dataKey="age" stroke="#8884d8" activeDot={{r: 8}}/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export const Charts = () => {
	const users = useSelector(selectUsers);
	const dispatch = useDispatch();

	return (<ChartsContainer users={users} dispatch={dispatch}/>);
};
