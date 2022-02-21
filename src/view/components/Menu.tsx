import React from 'react';
import { Link } from 'react-router-dom';

interface MenuEntries {
	entries: Array<{
		label: string;
		path: string;
	}>;
}

export const Menu = ({ entries }: MenuEntries) => (
	<div className="menu-container">
		{entries.map((entry) => (
			<Link key={entry.path} to={entry.path}>
				<div className="menu-item" >
					{entry.label}
				</div>
			</Link>
		))}
	</div>
);
