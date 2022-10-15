const cors = require("cors");

const _allowPrivateCORS = (req, res, next) => {
    
    try{
        cors({
            origin: ["http://3.14.11.113:4000", "http://3.14.11.113:4000/product/upload"]
        })
        next();
    }catch(error){
        console.log("private cors failed")
    }
    
}

const _allowPublicCORS = (req, res, next) => {
    
    try{
        cors({
            origin: "*"
        })
    }catch(error){
        console.log("public cors failed")
    }


    next();
}

module.exports = { _allowPrivateCORS, _allowPublicCORS }
