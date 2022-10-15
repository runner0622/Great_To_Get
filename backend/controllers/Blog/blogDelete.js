// importing models
const { typeMatch, isEmpty } = require("../../improve/improve");
const BlogModel = require("../../models/blog.model")

// importing logger
const { logger } = require("../../improve/logger") 
const log = logger(__filename)

/*
    DE -> 0
    SE -> 0
    CE -> 0
*/

const blogDelete = async (req, res, next) => {
const blogID = req.body.blogID;


    if (!typeMatch(blogID)){
        return res.status(404).json({
            msg: 'BlogID cannot be empty',
        });
    }

    
	try {

		const deletedBlog = await BlogModel.deleteOne(
			{ _id: blogID }
		);

		if (deletedBlog.deletedCount !== 1) {
            return res.status(400).json({
                msg: `Blog with ID ${blogID} does not exists`,
            });
		} 

        return res.status(200).json({
            msg: `Blog with ID ${blogID} has been deleted`
        });

		
	} catch (error) {
        const [ERROR, STATUS, MESSAGE] = ['SE_AUTH_BLOG_DELETE_01', 500,  'BLOG Delete Failed']

        log.error(ERROR, STATUS, 'dragon', MESSAGE)
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_DELETE_ERROR"
		});
	}
};

module.exports = { blogDelete };
