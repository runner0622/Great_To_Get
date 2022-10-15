const { logger} = require("../../improve/logger");
const log = logger(__filename);


const test2 = async (req, res, next) => {

    console.log(req.file)
 
	return res.status(200).json({
		msg: "HelloWorld",
	});
};

module.exports = { test2 };
