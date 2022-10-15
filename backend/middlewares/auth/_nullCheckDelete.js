const { isEmpty, typeMatch } = require('../../improve/improve')
const { logger } = require("../../improve/logger")

const _nullCheckDelete = async (req, res, next) => {

    /* ----------------------------- START TYPE CHECK ---------------------------- */

    // typecheck username
    if(!typeMatch(username)){
        const [MESSAGE, STATUS, ERROR] = ["username is not valid type", 400, "CE_MxLC_01"]

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

    // typecheck apikey
    if(!typeMatch(apikey)){
        const [MESSAGE, STATUS, ERROR] = ["password is not valid type", 400, "CE_MxNLC_02"]

        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error: ERROR 
        })
    }

    /* ----------------------------- END TYPE CHECK ---------------------------- */



    /* ----------------------------- START NULL CHECK ---------------------------- */

    // null check username
    if(isEmpty(req.body.username.trim())){
        const [MESSAGE, STATUS, ERROR] = ["username is null or undefined", 400, "CE_MxNLC_03"]

        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error: ERROR 
        })
    }

    // null check password
    if (isEmpty(req.body.password)){
        const [MESSAGE, STATUS, ERROR] = ["password is null or undefined", 400, "CE_MxNLC_04"]

        log.warning(ERROR, STATUS, MESSAGE)
        return res.status(STATUS).json({
            msg: MESSAGE,
            error: ERROR 
        })
    }

    /* ----------------------------- END NULL CHECK ---------------------------- */

    next();
};

module.exports = { _nullCheckDelete }