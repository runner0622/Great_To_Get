import { useEffect } from "react";

const MODE = process.env.NEXT_PUBLIC_MODE;

const isMode = (mode) => {
	return mode === MODE;
};

const SERVER = isMode("DEV")
	? process.env.NEXT_PUBLIC_LOCAL_BACKEND
	: process.env.NEXT_PUBLIC_BACKEND;

const url = (endpoint) => {
    console.log("endpoint -->", process.env.NEXT_PUBLIC_MODE);
	return `${SERVER}${endpoint || ''}`;
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

// function useEffectAsync(asyncFn, onSuccess) {
//     useEffect(() => {
//       let isActive = true;
//       asyncFn().then(data => {
//         if (isActive) onSuccess(data);
//       });
//       return () => { isActive = false };
//     }, [asyncFn, onSuccess]);
//   }

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

// Computes the SHA-256 digest of a string with Web Crypto
// Source: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

function sha256(str) {
	function hex(buffer) {
		var digest = "";
		var view = new DataView(buffer);
		for (var i = 0; i < view.byteLength; i += 4) {
			// We use getUint32 to reduce the number of iterations (notice the `i += 4`)
			var value = view.getUint32(i);
			// toString(16) will transform the integer into the corresponding hex string
			// but will remove any initial "0"
			var stringValue = value.toString(16);
			// One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
			// chars for Uint16 and 2 chars for Uint8)
			var padding = "00000000";
			var paddedValue = (padding + stringValue).slice(-padding.length);
			digest += paddedValue;
		}

		return digest;
	}
	// Get the string as arraybuffer.
	var buffer = new TextEncoder("utf-8").encode(str);
	return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
		return hex(hash);
	});
}

const forceToNumber = (n) => {
	const temp = Number(n);

	if (isNaN(temp)) {
		return 0;
	} else {
		return temp;
	}
};

const executor = (func) => {
	const inner = () => {
		return func();
	};
	return inner();
};

function isNetworkError(err) {
    return !!err.isAxiosError && !err.response;
  }

export {
	url,
	isEmpty,
	useEffectAsync,
	randomHash,
	xrange,
	xiter,
	sha256,
	MODE,
	isMode,
	SERVER,
	forceToNumber,
	executor,
    isNetworkError
};
