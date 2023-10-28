const jwt = require("jsonwebtoken")


const checkLogin = (req, res, next) => {

    try {
        const { authorization } = req.headers;
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        const { email, id } = decoded;
        req.email = email;
        req.id = id;
        next()
    } catch (error) {
        res.json({
            error: "there was an server error"
        })
    }
}


module.exports = checkLogin