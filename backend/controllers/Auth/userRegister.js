const UserModel = require("../../models/user.model");
const { isEmpty } = require("../../improve/improve");

/*
    DE -> 1
    SE -> 0
    CE -> 2
*/

// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);

const userRegister = async (req, res, next) => {
    try {
        let { username, password, email } = req.body;

		const userResult = await UserModel.findOne({
            $or: [{ username: username }, { email: email }],
        });

		if (!isEmpty(userResult)){
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

module.exports = userRegister;