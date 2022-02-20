import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../model/redux/actions';

export const UserSection = ({ children }: { children: Array<JSX.Element> }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>{children}</div>;
};
