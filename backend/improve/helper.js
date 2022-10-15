const isMode = (mode) => process.env.MODE === mode;

const MODE = process.env.MODE;

const HOSTNAME = isMode("DEV")
	? "http://localhost:4000"
	: process.env.HOSTNAME;


const url = (endpoint) => {
	return `${HOSTNAME}${endpoint || ''}`;
};


const routes = [url(), url("/upload/product"), 'http://localhost:3000'];

const allowPublicCORS = {
	origin: "*",
};

const allowPrivateCORS = {
	origin: routes,
};

module.exports = {
	allowPrivateCORS,
	allowPublicCORS,
	url,
	routes,
	HOSTNAME,
	isMode,
	MODE
};
