import { User } from '../User';

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
