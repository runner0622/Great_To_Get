import autoDelete from '../Cron/autoDeleteRefreshToken';
import verifyRT from '../Helpers/verifyRefreshToken';
import logger from '../../improve/logger';
const log = logger();


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

export default { test };
