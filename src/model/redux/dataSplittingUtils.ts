import { User } from '../User';

export const groupUsersByValuesOfKey = (users: Array<User>, keyToGroupBy: string) => {
	const acc = new Map() as Map<string, Array<number>>;
	users.forEach((eachUser: { [index: string]: any }) => {
		const valueToGroupBy: string = eachUser[keyToGroupBy];
		const userId = eachUser.id;
		if (!acc.get(valueToGroupBy)) {
			acc.set(valueToGroupBy, [userId]);
		} else {
			acc.get(valueToGroupBy)?.push(userId);
		}
	});
	return Array.from(acc, ([id, userIds]) => ({ id, userIds }));
};
