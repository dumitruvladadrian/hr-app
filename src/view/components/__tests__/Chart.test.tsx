import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Chart } from '../Chart';

test('Checking App snapshot', () => {
	const computedData = () => [
		{ average: 30, name: 'Electrical Products' },
		{
			average: 43,
			name: 'Telecommunications Equipment',
		},
	];
	const chart = render(<Chart computeData={computedData} />);
	expect(chart.container.firstChild).toMatchSnapshot();
});
