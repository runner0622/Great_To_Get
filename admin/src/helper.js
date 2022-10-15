import { useEffect } from "react";

const MODE = process.env.REACT_APP_MODE || "DEV";

const SERVER =
	MODE === "DEV"
		? process.env.REACT_APP_LOCAL_BACKEND || "http://localhost:2000"
		: process.env.REACT_APP_BACKEND;

const url = (endpoint) => {
	return `${SERVER}${endpoint}`;
};

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

function useEffectAsync(effect, inputs) {
	useEffect(() => {
		effect();
	}, inputs);
}

const replaceWithIndex = (array, index, element) => {
	array.splice(index, 1, element);
	return array;
};

const xrange = (start = 0, stop = 5, step = 1) => {
	let array = [];
	let i = start;
	while (i <= stop) {
		array.push(i);
		i += step;
	}
	return array;
};

const xiter = (stop = 10) => {
	let array = [];
	let i = 1;
	while (i <= stop) {
		array.push(i);
		i += 1;
	}
	return array;
};

const randomHash = (length = 24, type = 1) => {
	let characters = "";
	let result = "";
	if (type === 1) {
		characters = "abcdef0123456789";
	} else {
		characters = "ABCDEFabcdef0123456789";
	}

	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
};

// if types are equal
const typeMatch = (variable, expected = "string") => {
	if (typeof variable === expected) {
		return true;
	}
	return false;
};

const HEADER_PAYLOAD = {
	"content-type": "application/json",
	Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

export {
	url,
	isEmpty,
	useEffectAsync,
	randomHash,
	typeMatch,
	xrange,
	xiter,
	SERVER,
	MODE,
	HEADER_PAYLOAD,
};
