const { typeMatch, isEmpty } = require("../../improve/improve");
const BlogModel = require("../../models/blog.model");
// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);

const blogCreate = async (req, res, next) => {
	let {
		id,
		title,
		data,
		author,
		published_status,
		header_image,
		category,
		published_time,
		short_info,
	} = req.body;

	const rbody = {
		id,
		title,
		author,
		published_status,
		header_image,
		category,
		published_time,
		short_info,
		data,
	};

	/* ---------------------  START NULL CHECK ------------------------------- */
	for (const [key, value] of Object.entries(rbody)) {
		if (isEmpty(value)) {
			return res.status(400).json({
				msg: `${key} should not be empty`,
                success: false,
			});
		}
	}

	// /* ---------------------  END NULL CHECK ------------------------------- */

	// /* ---------------------  START TYPE CHECK ------------------------------- */
	if (!typeMatch(title)) {
		return res.status(400).json({
			msg: `title should be alphanumeric sequence`,
            success: false,
		});
	}

	if (!typeMatch(id)) {
		return res.status(400).json({
			msg: `id should be alphanumeric sequence`,
            success: false,
		});
	}

	if (!typeMatch(author)) {
		return res.status(400).json({
			msg: `author should be alphanumeric sequence`,
            success: false,
		});
	}

	if (!typeMatch(data, "object")) {
		return res.status(400).json({
			msg: `data should an editorjs object block`,
            success: false,
		});
	}

	if (!typeMatch(category)) {
		return res.status(400).json({
			msg: "category should be text",
            success: false,
		});
	}

	if (!typeMatch(header_image)) {
		return res.status(400).json({
			msg: `header image url should be text`,
            success: false,
		});
	}

	if (!typeMatch(published_time, "number")) {
		return res.status(400).json({
			msg: `published time url should be number`,
            success: false,
		});
	}

	if (!typeMatch(short_info)) {
		return res.status(400).json({
			msg: `short info should be text`,
            success: false,
		});
	}
	// /* ---------------------  END TYPE CHECK ------------------------------- */

	const findRes = await BlogModel.findById({ _id: id });

	const DATA_PAYLOAD = {
		_id: id,
		...rbody,
	};

	if (isEmpty(findRes)) {
		try {
			const new_blog = new BlogModel(DATA_PAYLOAD);
			const res_save = await new_blog.save();
			return res.status(200).json({
				id: res_save._id,
				success: true,
			});
		} catch (error) {
			const [ERROR, STATUS, MESSAGE] = [
				"SE_BLOG_CREATE_ERROR",
				400,
				"BLOG Create Failed",
			];
			log.error(ERROR, STATUS, "mamba", MESSAGE);
			return res.status(STATUS).json({
				msg: MESSAGE,
				error: ERROR,
                success: false,
			});
		}
	} else {
		try {
			const findBlog = await BlogModel.findById({ _id: id });
			if (isEmpty(findBlog)) {
				return res.status(400).json({
					msg: `Blog with ID ${id} does not exists`,
                    success: false,
				});
			}

			const updatedBlog = await BlogModel.updateOne(
				{ _id: id },
				{ ...rbody }
			);

			if (updatedBlog.nModified !== 1) {
				const [ERROR, STATUS, MESSAGE] = [
					"SE_BLOG_UPDATE_ERROR",
					500,
					"Blog was Already Updated",
				];
				log.error(ERROR, STATUS, "mamba", MESSAGE);
				return res.status(STATUS).json({
					msg: "Blog was Already Updated",
                    success: false,
				});
			}

			return res.status(200).json({
                msg: "Blog Updated",
				success: true,
			});
		} catch (error) {
			const [ERROR, STATUS, MESSAGE] = [
				"SE_BLOG_UPDATE_ERROR",
				500,
				"BLOG Update Failed",
			];
			log.error(ERROR, STATUS, "dragon", MESSAGE);
			return res.status(STATUS).json({
				msg: "Server Error",
				error: "SE_BLOG_UPDATE_ERROR",
                success: false,
			});
		}
	}
};

module.exports = { blogCreate };
