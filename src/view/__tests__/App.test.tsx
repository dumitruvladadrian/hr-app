import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import React from 'react';
import {App} from '../App';

test('Checking App snapshot', () => {
	const app = render(
		<App/>
	);
	expect(app.container.firstChild).toMatchSnapshot();
});
