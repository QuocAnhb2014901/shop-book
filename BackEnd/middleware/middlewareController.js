const jwt = require("jsonwebtoken");
const allowRole = (role) => {

  return (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid!");
        }
        if (role.includes(user.role)) {
          next();
        } else {
          res.status(403).json("Bạn không được phép");
        }
      });
    } else {
      res.status(401).json("Bạn chưa được xác thực");
    }
  };
};

module.exports = {
  allowRole
};
