export const isMode = (mode) => process.env.MODE === mode;

export const MODE = process.env.MODE;

export const HOSTNAME = isMode("DEV")
    ? "http://localhost:4000"
    : process.env.HOSTNAME;


export const url = (endpoint) => {
    return `${HOSTNAME}${endpoint || ''}`;
};


export const routes = [url(), url("/upload/product"), 'http://localhost:3000'];

export const allowPublicCORS = {
    origin: "*",
};

export const allowPrivateCORS = {
    origin: routes,
};
