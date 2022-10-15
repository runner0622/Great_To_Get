const refreshToken = require("../../models/refreshToken.model");
const jwt = require("jsonwebtoken");


const verifyRefreshToken = (token) => {
	try {
		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
		return true;
	} catch {
		return false;
	}
};

const autoDeleteRefreshToken = async (req, res, next) => {
	let tokens = await refreshToken.find();
	try {
		for (const x of tokens) {
			if (!verifyRefreshToken(x.token)) {
				await refreshToken.deleteOne({ _id: x.id });
			}
		}
		return true;
	}catch{
		return false;
	}
};

module.exports = { autoDeleteRefreshToken };
