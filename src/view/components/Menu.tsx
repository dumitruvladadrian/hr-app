import React from 'react';
import { Link } from 'react-router-dom';

interface MenuEntries {
	entries: Array<{
		label: string;
		path: string;
	}>;
}

export const Menu = ({ entries }: MenuEntries) => (
	<div style={{ minWidth: '150px' }}>
		{entries.map((entry) => (
			<div key={entry.path}>
				<Link to={entry.path}>{entry.label}</Link>
			</div>
		))}
	</div>
);
