import logger from '../../improve/logger';
const log = logger();


const test2 = async (req, res, next) => {

    console.log(req.file)
 
	return res.status(200).json({
		msg: "HelloWorld",
	});
};

export default { test2 };
