const { isEmpty } = require('../improve/improve')

const _statusCheck = async (req, res, next) => {

    statusData = req.tokenData.status
    // if status data is empty
    if (isEmpty(statusData)){
        return res.status(400).json({
            "msg": "access forbidden",
            "error": "CE_MEMBER_STATUS_01"
        })
    }

    
    // if role is not authorized
    if (statusData !== 'active'){
        return res.status(400).json({
            "msg": "access forbidden",
            "error": "CE_MEMBER_STATUS_02"
        })
    }

    next();
}



module.exports = {_statusCheck }