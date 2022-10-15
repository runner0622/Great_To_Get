const productUpload = async (req, res) => {
    return res.status(200).json({
        msg: "attempting to upload"
    })
};

module.exports = { productUpload };
