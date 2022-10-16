import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const _singleFileUpload = async (req, res, next) => {
    console.log("starting ... single upload --")
	try {

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "great_to_get",
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
    
                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);
            });
        };
        
        const upload = async (req) => {
            return await streamUpload(req);
        }

        req.singleImage = await upload(req)

        console.log("leaving ... single upload --")
        next()

	} catch (error) {
        console.log(error)
		return res.status(500).json({
            msg: "Cloudinary Error Uploading Image",
            error: "SE_M_SINGLE_FILE_UPLOAD_01",
        })
	}

};


export { _singleFileUpload };