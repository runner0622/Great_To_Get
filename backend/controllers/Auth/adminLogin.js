// importing models
const AdminModel = require("../../models/admin.model");
const refreshToken = require("../../models/refreshToken.model");

// importing auth modules
const { generateAccessToken, generateRefreshToken } = require("./auth");

// importing helpers
const { isEmpty } = require("../../improve/improve");

// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);



/*
    CE -> 3
    DE -> 1
    SE -> 2
*/


const adminLogin = async (req, res) => {
	try {
		let { username, password } = req.body;


		userInfo = await AdminModel.findOne({
			username: username,
		});

        if (isEmpty(userInfo)){
            const [MESSAGE, STATUS, ERROR] = ['Username or Password does not exists', 401, "CE_C_AUTH_ADMIN_LOGIN_01"]
            log.warning(ERROR, STATUS, MESSAGE)
            return res.status(STATUS).json({
                msg: MESSAGE,
                error: ERROR
            });
        }


        // does username have active account ?
        if (userInfo.status !== "active") {
            const [MESSAGE, STATUS, ERROR] = [`Username has been ${userInfo.status}`, 401, "CE_C_AUTH_ADMIN_LOGIN_02"]
            
            log.warning(ERROR, STATUS, MESSAGE)
            return res.status(STATUS).json({
                msg: MESSAGE,
                error: ERROR
            });
        }
        
        
        // username and password check
        if (!(userInfo.username === username && userInfo.password === password)) {
            const [MESSAGE, STATUS, ERROR] = [`Username or Password does not match`, 401, "CE_C_AUTH_ADMIN_LOGIN_03"]
            
            log.warning(ERROR, STATUS, MESSAGE)
            return res.status(STATUS).json({
                msg: MESSAGE,
                error: ERROR
            });
        }


        // remove password from payload
        userInfo.password = "";
            
        // payload with username and password
        payload = userInfo.toJSON();

        // creating JWT access token and refresh token
        const accessTokenValue = generateAccessToken(payload);
        const refreshTokenValue = generateRefreshToken(payload);

        // adding refresh token to db
        try {
            const newRefreshToken = new refreshToken({
                token: refreshTokenValue,
            });
            newRefreshToken.save();
        } catch (error) {
            // unable to save data to db
            const [ERROR, STATUS, LEVEL, MESSAGE] = ["DE_C_AUTH_ADMIN_LOGOUT_02", 500, 'mamba', 'Server Error']
            log.error(ERROR, STATUS, LEVEL, error.message)
            return res.status(STATUS).json({
                msg: MESSAGE,
                error: ERROR
            });
        }

        // return access token and refresh token for 1st time
        return res.status(200).json({
            msg: "success",
            accessToken: accessTokenValue,
            refreshToken: refreshTokenValue,
        });
        
       
	} catch (error) {
        const [ERROR, STATUS, LEVEL, MESSAGE] = ["SE_C_AUTH_ADMIN_LOGOUT_02", 500, 'dragon', error.message]
        log.error(ERROR, STATUS, LEVEL, MESSAGE)
        return res.status(STATUS).json({
            msg: 'Server Error',
            error: ERROR
        });
	}
};

module.exports = adminLogin;
