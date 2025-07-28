const jwt = require("jsonwebtoken");
const JET_SECRET = "hello";

const fetchUser = (req, res, next) => {
    const token = req.header("authToken");
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JET_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchUser