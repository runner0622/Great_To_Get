import UserModel from '../../models/user.model';
import { isEmpty } from '../../improve/improve';

/*
    DE -> 1
    SE -> 0
    CE -> 2
*/

// importing logger
import logger from '../../improve/logger';

const log = logger();
import hasher from 'js-sha256';

const userRegister = async (req, res, next) => {
    try {
        let { username, password, email } = req.body;

        // encrypt password with sha256
        password = hasher.sha256(password)
        console.log("password", password);

        const userResult = await UserModel.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (!isEmpty(userResult)) {
            return res.status(400).json({
                message: "User already exist",
            });
        }

        if (!username || !password || !email) {
            return res.status(400).json({
                message: "Please fill all the fields",
                status: "failed",
                fields: {
                    username: !username,
                    password: !password,
                    email: !email,
                }
            });
        }

        const newUser = new UserModel({
            username,
            password,
            email,
        });

        const result = await newUser.save();

        if (!isEmpty(result)) {
            return res.status(200).json({
                message: "User registered successfully",
            });
        } else {
            return res.status(400).json({
                message: "User registration failed",
            });
        }

    } catch (error) {
        console.log(error);
        const ERROR = "SE_C_AUTH_ADMIN_REG_01";

        log.error(ERROR, "dragon", error.message);
        return res.status(500).json({
            msg: "Server Error",
            error: ERROR,
        });
    }
};

export default userRegister;