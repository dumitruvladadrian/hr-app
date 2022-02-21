/**
 * This file contains the definition of the User entity and some utility functions
 */

export interface User {
	id: number;
	// eslint-disable-next-line camelcase
	first_name: string;
	// eslint-disable-next-line camelcase
	last_name: string;
	email: string;
	// eslint-disable-next-line camelcase
	date_of_birth: string;
	age: number;
	industry: string;
	salary: number;
	// eslint-disable-next-line camelcase
	years_of_experience: number;
}

export const createUser = (
	id: number,
	firstName: string,
	lastName: string,
	email: string,
	dateOfBirth: string,
	age: number,
	industry: string,
	salary: number,
	yearsOfExperience: number
) => ({
	id,
	// eslint-disable-next-line camelcase
	first_name: firstName,
	// eslint-disable-next-line camelcase
	last_name: lastName,
	email,
	// eslint-disable-next-line camelcase
	date_of_birth: dateOfBirth,
	age,
	industry,
	salary,
	// eslint-disable-next-line camelcase
	years_of_experience: yearsOfExperience,
});

export const UNKNOWN_USER_ID = -1;

export const validateUserId = (id: string | undefined | null, idList: Array<number | string>) => {
	if (id === null || id === undefined) {
		return UNKNOWN_USER_ID;
	}

	const idAsNumber = parseInt(id, 10);

	if ((!Number.isNaN(idAsNumber) && idList.includes(idAsNumber)) || idList.includes(id)) {
		return idAsNumber;
	} else {
		return UNKNOWN_USER_ID;
	}
};
