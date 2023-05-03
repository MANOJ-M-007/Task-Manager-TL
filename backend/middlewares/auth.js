const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const asyncHandler = require("express-async-handler");
const dotenv = require('dotenv');

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log(decoded); // add this line to log the decoded token payload

      const user = await Users.findOne({
        where: {
          id: decoded.id
        },
        attributes: {
          exclude: ['password'] // exclude the password column from the result
        }
      });

      if (!user) {
        throw new Error("User not found");
      }

      req.user = user;
      // console.log(req.user);
      next();
    } catch (error) {
      // console.error(error); // add this line to log the error
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
