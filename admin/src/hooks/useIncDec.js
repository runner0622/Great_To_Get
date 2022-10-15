import React, { useState, useEffect } from "react";
import customToast from "../components/blocks/swal/customToast";

const forceToNumber = (n) => {
	const temp = Number(n);

	if (isNaN(temp)) {
		return 0;
	} else {
		return temp;
	}
};

const useIncDec = ({ initalvalue = 0, minvalue = 0, maxvalue = 100 }) => {
	let [valueInstance, setValueInstance] = useState(initalvalue);

	const valueChangeHandler = (value) => {
		const fnum = forceToNumber(value);
		const maxCheck = fnum > maxvalue;

		if (maxCheck) {
			setValueInstance(maxvalue);
			customToast("error", `item cannot be greater than ${maxvalue}`);
		} else {
			setValueInstance(fnum);
		}
	};

	const incrementHandler = () => {
		const maxCheck = valueInstance >= maxvalue;

		if (maxCheck) {
			customToast("warning", `item cannot be greater than ${maxvalue}`);
		} else {
			setValueInstance((x) => x + 1);
		}
	};

	const decrementHandler = () => {
		const minCheck = minvalue >= valueInstance;
		if (minCheck) {
			customToast("warning", `item cannot be less than ${minvalue}`);
		} else {
			setValueInstance((x) => x - 1);
		}
	};


	const componentBlock = (
		<div className='indec'>
			<button className="indec__dec" onClick={decrementHandler}>
				-
			</button>
			<input
				className="indec__value"
				value={valueInstance}
				onChange={({ target: { value } }) => {
					valueChangeHandler(value);
				}}
			/>
			<button className="indec__inc" onClick={incrementHandler}>
				+
			</button>
		</div>
	);

	return [valueInstance, setValueInstance, componentBlock];
};

export default useIncDec;
