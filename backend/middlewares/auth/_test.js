const _test = (req, res, next) => {

    res.status(200).json({
        msg: "passed test"
    })

    next()
}


export default { _test };