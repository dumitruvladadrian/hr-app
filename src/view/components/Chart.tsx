import React from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

interface ChartDataPoint {
	name: string;
	average: number;
}

interface ChartProps {
	computeData: () => Array<ChartDataPoint>;
}

// basic pre-configured chart component
export const Chart = ({ computeData }: ChartProps) => (
	<div>
		<div style={{ width: 1500, height: '80vh' }}>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					height={300}
					data={computeData()}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" angle={-70} textAnchor="end" height={500} interval={0} />
					<YAxis dataKey="average" />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="average" stroke="#8884d8" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	</div>
);
