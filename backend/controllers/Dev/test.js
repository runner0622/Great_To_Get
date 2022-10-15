const autoDelete = require("../Cron/autoDeleteRefreshToken");
const verifyRT = require("../Helpers/verifyRefreshToken");

const { logger} = require("../../improve/logger");
const log = logger(__filename);


const test = async (req, res, next) => {
 
    try{
        const foo = () => log("hi")
        foo("hello")
    }catch(error){
        log.success("SE_AA_1 200", "hello World");
        log.info("SE_AA_2 200", "KAKEKIKUKO")
        log.warning("SE_AA_2 200", "KAKEKIKUKO")
        log.error("SE_AA_2 200",'mamba', "KAKEKIKUKO")
        log.cron("ERROR")
        // console.log(alias)
    }

	return res.status(200).json({
		msg: "HelloWorld",
	});
};

module.exports = { test };
