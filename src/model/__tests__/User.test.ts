import { UNKNOWN_USER_ID, validateUserId } from '../User';

describe('validateUserId Tests', () => {
	test('Should return invalid user for null and undefined', () => {
		expect(validateUserId(null, [])).toEqual(UNKNOWN_USER_ID);
		expect(validateUserId(undefined, [])).toEqual(UNKNOWN_USER_ID);
	});

	test('Should return invalid user for string id', () => {
		expect(validateUserId('a', [])).toEqual(UNKNOWN_USER_ID);
	});

	test('Should return invalid user when id is not in list of ids', () => {
		expect(validateUserId('1', [2, 3, 4])).toEqual(UNKNOWN_USER_ID);
	});

	test('Should return invalid user when id is string but is not in list of ids', () => {
		expect(validateUserId('a', ['b', 'c', 'd'])).toEqual(UNKNOWN_USER_ID);
	});

	test('Should return invalid user when id is number but is not in list of ids', () => {
		expect(validateUserId('1', [2, 3, 4])).toEqual(UNKNOWN_USER_ID);
	});

	test('Should return id when id is string but and in list of ids', () => {
		expect(validateUserId('1', ['1', '2', '3', '4'])).toEqual(1);
	});

	test('Should return id when id is number and in list of ids', () => {
		expect(validateUserId('1', [1, 2, 3, 4])).toEqual(1);
	});
});
