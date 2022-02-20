import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from '../model/redux/store';
import { UserList } from './UserList';
import { Menu } from './components/Menu';
import { AgePerIndustryChart } from './AgePerIndustryChart';
import { UserDetails } from './UserDetails';
import { EditUser } from './EditUser';
import { Header } from './components/Header';
import { UserSection } from './UserSection';
import {SalaryPerIndustryChart} from './SalaryPerIndustryChart';
import {SalaryPerExperienceChart} from './SalaryPerExperienceChart';

export const USER_ID = 'userId';

export const paths = {
	userList: '/users',
	userDetails: `/users/:${USER_ID}`,
	editUser: `/users/:${USER_ID}/edit`,
	agePerIndustryChart: '/age-industry',
	salaryPerIndustryChart: '/salary-industry',
	salaryPerExperienceChart: '/salary-experience',
};

export const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Header />
			<UserSection>
				<Menu
					entries={[
						{ label: 'User List', path: paths.userList },
						{ label: 'Age / Industry', path: paths.agePerIndustryChart },
						{ label: 'Salary / industry', path: paths.salaryPerIndustryChart },
						{ label: 'Salary / Experience', path: paths.salaryPerExperienceChart },
					]}
				/>
				<Routes>
					<Route path={paths.userList} element={<UserList />} />
					<Route path={paths.userDetails} element={<UserDetails />} />
					<Route path={paths.editUser} element={<EditUser />} />
					<Route path={paths.agePerIndustryChart} element={<AgePerIndustryChart />} />
					<Route path={paths.salaryPerIndustryChart} element={<SalaryPerIndustryChart />} />
					<Route path={paths.salaryPerExperienceChart} element={<SalaryPerExperienceChart />} />
					<Route path="*" element={<Navigate to={paths.userList} />} />
				</Routes>
			</UserSection>
		</BrowserRouter>
	</Provider>
);
