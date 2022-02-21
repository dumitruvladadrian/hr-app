import { dobToAge, experienceValueProcessor, groupUsersByValuesOfKey } from '../dataSplittingUtils';

describe('groupUsersByValuesOfKey Tests', () => {
	test('Should group by given key', () => {
		const data = [
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

		const expected = [
			{ id: 'n/a', userIds: [1] },
			{ id: 'Telecommunications Equipment', userIds: [2] },
		];

		expect(groupUsersByValuesOfKey(data, 'industry', (val) => val)).toEqual(expected);
	});
});

describe('dobToAge Tests', () => {
	test('Should return age from birth date', () => {
		const twentyTwoYearsAgo = new Date().getFullYear() - 22;
		expect(dobToAge(`01/01/${twentyTwoYearsAgo}`)).toEqual(22);
	});
});

describe('experienceValueProcessor Tests', () => {
	test('Should round down value', () => {
		expect(experienceValueProcessor('2.345')).toEqual('2');
	});
});
