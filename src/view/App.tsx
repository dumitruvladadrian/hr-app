import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from '../model/redux/store';
import { UserList } from './UserList';
import { Menu } from './Menu';
import { Charts } from './Charts';
import { UserDetails } from './UserDetails';
import { EditUser } from './EditUser';
import { Header } from './Header';
import { Page } from './Page';

export const USER_ID = 'userId';

export const paths = {
	userList: '/users',
	userDetails: `/users/:${USER_ID}`,
	editUser: `/users/:${USER_ID}/edit`,
	charts: '/charts',
};

export const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Header />
			<Page>
				<Menu
					entries={[
						{ label: 'User List', path: paths.userList },
						{ label: 'Charts', path: paths.charts },
					]}
				/>
				<Routes>
					<Route path={paths.userList} element={<UserList />} />
					<Route path={paths.userDetails} element={<UserDetails />} />
					<Route path={paths.editUser} element={<EditUser />} />
					<Route path={paths.charts} element={<Charts />} />
					<Route path="*" element={<Navigate to={paths.charts} />} />
				</Routes>
			</Page>
		</BrowserRouter>
	</Provider>
);
