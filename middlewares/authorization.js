module.exports = async (req, res, next) => {
  const { verifyToken } = require("../utils/jwtHandler");
  const userModel = require("../models/userSchema");
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const userToken = verifyToken(token);
    const findUser = await userModel.findOne({ _id: userToken.id });
    if (userToken.id == findUser._id) {
      req.userId = userToken.id;
      next();
    }
  } catch (error) {
    next(error);
    response.status(500).json({ message: "Internal server error" });
  }
};
