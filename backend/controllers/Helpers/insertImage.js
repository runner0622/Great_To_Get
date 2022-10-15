const insertImage = (req, res, next) => {
    if (typeof req.singleImage.secure_url === 'string'){
        return res.status(200).json({
            success: 1,
            file: {
                url: req.singleImage.secure_url,
            },
        });
    }else{
        return res.status(400).json({
            msg: "insert image error"
        });
    }
	
};

module.exports = { insertImage };
