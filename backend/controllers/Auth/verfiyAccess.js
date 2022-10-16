const verfiyAccess = (req, res, next) => {
    return res.status(200).json({
        msg: "success"
    })
}

export default {verfiyAccess};
