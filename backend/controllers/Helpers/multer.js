const multer = require('multer');

const upload = (file) => {


    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/')
        },
    })
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, './uploads/')
    //     },
    //     filename: (req, file, cb) => {
    //         console.log("File Object",file);
    //         let ext = '';
    //         if(file.originalname.split('.').length >1 ){
    //             ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    //         }
    //         console.log('ext', ext);
    //         cb(null, file.fieldname + '-' + Date.now() + ext)
    //     }
    // })

    return multer({ storage: storage }).array(file);
}
module.exports = {
    upload
}