// importing logger
import { typeMatch } from '../improve/improve';

import logger from '../improve/logger';
const log = logger()


const _apiKeyCheck = async (req, res, next) => {

    let apikey = req.body.apikey

    if (typeof apikey === 'undefined'){
        apikey = req.context.apikey
    }


    if (!typeMatch(apikey)){
        return res.status(404).json({
            msg: 'apikey is not valid type',
        });
    }

	if (apikey !== process.env.APIKEY) {
		const MESSAGE = 'APIKEY Does not Match'
        const WARNING = 'CE_API_KEY_CHECK_01'

        log.warning(WARNING, 400, MESSAGE);
		return res.status(400).json({
			msg: MESSAGE,
            error: WARNING
		});
	}

	next();
};

export default { _apiKeyCheck };
