import React from 'react';

interface NumericInputProps {
	value: number;
	setValue: (newvalue: number) => any;
}

/**
 * Controlled component that allows only certain inputs.
 * The regex matches plain numbers or numbers with a decimal point and maximum 3 decimal values.
 *
 * @param value input display value
 * @param setValue - callback to handle the value
 */
export const NumericInput = ({ value, setValue }: NumericInputProps) => {
	const pattern = /^[-+0-9](?:[0-9]*)?[.]?[0-9]{0,3}$/;
	const validateInput = (value: string) => pattern.test(value);

	return (
		<input
			style={{ width: '500px' }}
			value={value}
			onChange={(e) => {
				if (validateInput(e.target.value)) {
					setValue(parseFloat(e.target.value));
				}
			}}
		/>
	);
};
