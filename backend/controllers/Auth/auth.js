const jwt = require("jsonwebtoken");
const refreshToken = require("../../models/refreshToken.model");
const { isEmpty, typeMatch } = require("../../improve/improve");

// importing logger
const { logger } = require('../../improve/logger')
const log = logger(__filename)


/*
    filename: AUTH

    CE:   1  
    SE:   1 
    DE:   1
*/


// generate new access token
const generateAccessToken = (payload) => {
    console.log("current Expiry: ", process.env.ACCESS_TOKEN_EXPIRY);
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
	});
};

// generate new refresh token
const generateRefreshToken = (payload) => {
	return jwt.sign(
		payload,
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
	);
};


// Renew AccessToken 
const renewToken = async (req, res, next) => {
    const currentRefreshToken = req.body.token;

    // is refresh token valid type?
    if(isEmpty(currentRefreshToken) || !typeMatch(currentRefreshToken)){
        const [MESSAGE, STATUS, ERROR] = ["CE_AUTH_01", 400, "token invalid or expired"]

        log.warning(MESSAGE, STATUS, ERROR);
		return res.status(STATUS).json({
            "msg": MESSAGE,
            "error": ERROR
        })
	};


    // check if refresh token in the db or not
	const tokenData = await refreshToken.findOne({
		token: currentRefreshToken,
	})
	if (isEmpty(tokenData)){
        const [MESSAGE, STATUS, ERROR] = ["DE_AUTH_01", 500, "token invalid or expired"];

        log.warning(MESSAGE, STATUS, ERROR);
		return res.status(STATUS).json({
            "msg": MESSAGE,
            "error": ERROR
        })
	}

    // Renew AccessToken if current refresh token is valid
    try{
        const payload = jwt.verify(tokenData.token, process.env.REFRESH_TOKEN_SECRET)
        delete payload['iat']
        delete payload['exp']
        const newAccessToken = generateAccessToken(payload);
        return res.status(200).json({
            accessToken: newAccessToken
        })
    }catch{
        const [MESSAGE, STATUS, ERROR] = ['SE_AUTH_MAIN', 500, "token invalid or expired"];

        log.warning(MESSAGE, STATUS, ERROR);
		return res.status(STATUS).json({
            "msg": MESSAGE,
            "error": ERROR
        })
    }
}


module.exports = { renewToken, generateAccessToken, generateRefreshToken };

