const any = (iterable) => {
	for (const e of iterable) {
        if (e) return true
    }
	return false;
};

const all = (iterable) => {
	for (const e of iterable) {
        if (!e) return false
    }
	return true;
};

const log = (message) => {
	console.log(message);
};

module.exports = { all, any, log };
