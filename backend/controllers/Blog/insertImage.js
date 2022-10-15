const insertImage = (req, res, next) => {
	return res.status(200).json({
		success: 1,
		file: {
			url: req.singleImage.secure_url,
		},
	});
};

module.exports = { insertImage };
