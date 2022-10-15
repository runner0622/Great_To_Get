const timeNow = () => Date.now();

const isEmpty = (arg) => {
	if (arg == null) {
		return true;
	} else if (typeof arg === "undefined") {
		return true;
	} else if (arg.length === 0) {
		return true;
	} else if (typeof arg === "object" && Object.keys(arg).length === 0) {
		return true;
	}
	return false;
};

// if types are equal
const typeMatch = (variable, expected = "string") => {
	if (typeof variable === expected) {
		return true;
	}
	return false;
};

const isEmptyType = (variable, expected = "string") => {
    return isEmpty(variable) && typeMatch(variable, expected)
}

//  check if elem in array
const keyCheck = (array, key) => {
	return Object.keys(array).includes(key);
};

const isNumeric = (str) => {
	if (typeof str == "number") return true;
	if (typeof str != "string") return false;
	return !isNaN(str) && !isNaN(parseFloat(str));
};


const isMode = (mode = 'dev') => {
	allowed = ['pro', 'dev', 'testing']
	if (!allowed.includes(mode)){
		mode = 'dev'
	}
	return process.env.MODE == mode ? true : false
}


const range = (start, stop) => {
	const output = [];
	for (var x = start; x < stop; x++) {
		output.push(x);
	}
	return output;
};

module.exports = {
	timeNow,
	typeMatch,
	keyCheck,
	isEmpty,
    isEmptyType,
	isNumeric,
	range,
};
