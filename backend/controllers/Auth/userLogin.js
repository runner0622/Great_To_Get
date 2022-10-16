// importing models
import UserModel from "../../models/user.model";
import refreshToken from "../../models/refreshToken.model";

// importing auth modules
import { generateAccessToken, generateRefreshToken } from "./auth";

// importing helpers
import { isEmpty } from "../../improve/improve";

// importing logger
import logger from "../../improve/logger";
const log = logger();
import { sha256 } from 'js-sha256';


/*
    CE -> 3
    DE -> 1
    SE -> 2
*/


const userLogin = async (req, res) => {
    try {
        let { username, password } = req.body;

        const userInfo = await UserModel.findOne({
            username: username,
        });

        if (isEmpty(userInfo)) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        if (userInfo.password !== password) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        if (!userInfo) {
            return res.status(400).json({
                message: "Invalid username or password",
                userInfo: userInfo,
            });
        }


        // remove password from payload
        userInfo.password = "";

        // payload with username and pa
        const payload = userInfo.toJSON();


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

export default userLogin;
