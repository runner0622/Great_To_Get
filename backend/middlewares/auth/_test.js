const _test = (req, res, next) => {

    res.status(200).json({
        msg: "passed test"
    })

    next()
}


module.exports = { _test }