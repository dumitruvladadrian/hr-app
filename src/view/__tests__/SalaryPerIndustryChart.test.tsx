import { computeData } from '../SalaryPerIndustryChart';

const users = [
	{
		id: 1,
		first_name: 'Loutitia',
		last_name: 'Steaning',
		email: 'lsteaning0@usnews.com',
		date_of_birth: '13/05/1978',
		industry: 'n/a',
		salary: 98803.83,
		years_of_experience: 6.6,
		age: 43,
	},
	{
		id: 2,
		first_name: 'Ewen',
		last_name: 'McLewd',
		email: 'emclewd1@bbb.org',
		date_of_birth: '15/12/1991',
		industry: 'Telecommunications Equipment',
		salary: 144392.9,
		years_of_experience: 2.8,
		age: 30,
	},
];
const industries = {
	'Telecommunications Equipment': {
		id: 'Telecommunications Equipment',
		userIds: [1],
	},
	'Electrical Products': {
		id: 'Electrical Products',
		userIds: [2],
	},
};

describe('computeData Tests', () => {
	test('Should compute result correctly', () => {
		const expected = [
			{ average: 98803.83, name: 'Telecommunications Equipment' },
			{
				average: 144392.9,
				name: 'Electrical Products',
			},
		];

		expect(computeData(users, industries)).toEqual(expected);
	});
});
