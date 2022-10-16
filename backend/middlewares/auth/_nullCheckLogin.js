import { isEmpty, typeMatch } from '../../improve/improve';

// import logger
import logger from '../../improve/logger';

const log = logger()


const _nullCheckLogin = async (req, res, next) => {

    const {username, password} = req.body;

    // typecheck username
    if(!typeMatch(username)){
        const [MESSAGE, STATUS, ERROR] = ["username is not valid type", 400, "CE_MxNLC_01"]

        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error: ERROR 
        })
    }

    // typecheck password
    if(!typeMatch(password)){
        const [MESSAGE, STATUS, ERROR] = ["password is not valid type", 400, "CE_MxNLC_02"]

        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error: ERROR 
        })
    }

    // null check username
    if(isEmpty(req.body.username.trim())){
        const [MESSAGE, STATUS, ERROR] = [ "username is null or undefined", 400, "CE_MxNLC_03"]

        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error: ERROR 
        })
    }

    // null check password
    if (isEmpty(req.body.password)){
        const [MESSAGE, STATUS, ERROR] = ["passsword is null or undefined", 400, "CE_MxNLC_04"]

        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error: ERROR 
        })
    }

    next();
};

export default _nullCheckLogin;