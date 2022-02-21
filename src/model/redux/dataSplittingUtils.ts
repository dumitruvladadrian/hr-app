import { User } from '../User';

/**
 * utility function to transform the user data, extract a certain field, select distinct values for that field
 * and assign to each of those values a list of user IDs that have that value.
 *
 * @param users list of users
 * @param keyToGroupBy key that will be used for the distinct groups
 * @param valueProcessor - function to transform the unique values (from rounding a number, for example)
 */
export const groupUsersByValuesOfKey = (
	users: Array<User>,
	keyToGroupBy: string,
	valueProcessor: (val: string) => string
) => {
	const acc = new Map() as Map<string, Array<number>>;
	users.forEach((eachUser: { [index: string]: any }) => {
		const valueToGroupBy: string = valueProcessor(eachUser[keyToGroupBy]);
		const userId = eachUser.id;
		if (!acc.get(valueToGroupBy)) {
			acc.set(valueToGroupBy, [userId]);
		} else {
			acc.get(valueToGroupBy)?.push(userId);
		}
	});
	return Array.from(acc, ([id, userIds]) => ({ id, userIds }));
};

/**
 * computes the age of a user based on the date of birth
 *
 * @param dob date of birth
 */
export const dobToAge = (dob: string) => {
	const parts = dob.split('/');
	const birthday = new Date(
		parseInt(parts[2], 10),
		parseInt(parts[1], 10) - 1,
		parseInt(parts[0], 10)
	);
	const ageInMillis = Date.now() - birthday.getTime();
	return Math.floor(ageInMillis / 31536000000);
};
/**
 * because experience is such a granular field, we need to round down the values so that we can clump them up in bigger groups.
 * This is purpose of this processor function.
 *
 * @param val value to be processed
 */
export const experienceValueProcessor = (val: string) => {
	const safeVal = val ? val.toString() : '0';
	return Math.floor(parseFloat(safeVal)).toString();
};
