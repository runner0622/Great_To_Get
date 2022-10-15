const { isEmpty, typeMatch } = require('../../improve/improve');
// tree shakable import 
const isEmail  = require('validator/lib/isEmail');


const _nullCheckRegister = async (req, res, next) => {

    let { username, password, email, apikey } = req.body;

    /* --------------------------------START TYPE CHECK------------------------------------ */
    if (!typeMatch(username)) {
        const MESSAGE = "username is not a string"
        const ERROR = "CE__CR_01"
        return res.status(400).json({ 
            msg: MESSAGE,
            error: ERROR
        });
    }

    if (!typeMatch(password)){
        return res.status(400).json({ 
            msg: "password is not a string",
            error: "CE__CR_02"
        });
    }


    if (!typeMatch(email)){
        return res.status(400).json({ 
            msg: "email is not a string",
            error: "CE__CR_03"
        });
    }
    if (!isEmail(email)){
        return res.status(400).json({ 
            msg: "email is not valid type",
            error: "CE__CR_03"
        });
    }

    if (!typeMatch(apikey)){
        return res.status(400).json({ 
            msg: "apikey is not a string",
            error: "CE__CR_04"
            
        });
    }
    /* --------------------------------END TYPE CHECK------------------------------------ */



    /* --------------------------------START NULL CHECK------------------------------------ */
    if (isEmpty(username.trim())){
        return res.status(400).json({
            msg: "username is empty or undefined",
            error: "CE__CR_31"
        })
    }

    if (isEmpty(password)){
        return res.status(400).json({
            msg: "password is empty or undefined",
            error: "CE__CR_32"
            
        })
    }

    if (isEmpty(email.trim())){
        return res.status(400).json({
            msg: "email is empty or undefined",
            error: "CE__CR_33"
        })
    }


    if (isEmpty(apikey.trim())){
        return res.status(400).json({
            msg: "apikey is empty or undefined",
            error: "CE__CR_34"
        })
    }
    /* --------------------------------END NULL CHECK------------------------------------ */

    req.context = { username, password, email, apikey }

    next();
};

module.exports = { _nullCheckRegister }