const jwt = require("jsonwebtoken"); // an app to make and use json token to perform protceting function

const authenticate = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]; // 
        const decode = jwt.verify(token, "SECRET");
        req.user = decode;
        next();
        
    } catch (error) {
        res.json({
            message: "Authentication Falied"
        })
    }

}

module.exports = authenticate;