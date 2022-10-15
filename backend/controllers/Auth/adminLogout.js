const { isEmpty, typeMatch } = require("../../improve/improve");
const refreshToken = require("../../models/refreshToken.model");

/*
    DE -> 1
    SE -> 0
    CE -> 2
*/

// importing logger
const { logger } = require('../../improve/logger')
const log = logger(__filename)

const adminLogout = async (req, res) => {
	token = req.body.token;

    // token is null or not string type
	if (isEmpty(token) || !typeMatch(token)) {
        const [MESSAGE, STATUS, ERROR] = ["logout error, failed token check", 400,  "CE_AUTH_ADMIN_LOGOUT_01"]

        log.warning(ERROR, STATUS, MESSAGE)
		return res.status(STATUS).json({
			msg: MESSAGE,
			error:  ERROR
		});
	}

	try {
		const deleteRefreshToken = await refreshToken.deleteOne({
			token: token,
		});
		if (deleteRefreshToken.deletedCount === 1) {
			return res.status(200).json({
				msg: "user successfully logged out"
			}); 
		} 

        // no match token found in db
        const [MESSAGE, STATUS, ERROR] = ["Admin logout failed", 400,  "DE_AUTH_ADMIN_LOGOUT_01"]
        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error:  ERROR
        });
		
		
	} catch (error) {
		return res.status(500).json({
            msg: "Unable to proceed client, Server Error",
            error: "SE_AUTH_ADMIN_LOGOUT_MAIN", // no match token found in db
        });
	}
};

module.exports = adminLogout;
