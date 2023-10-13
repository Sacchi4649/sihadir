module.exports = async (request, response, next) => {
  const { verifyToken } = require("../utils/jwtHandler");
  const userModel = require("../models/userSchema");
  try {
    if (!request.headers.authorization) {
      next({ name: "UnauthorizedError", message: "Silahkan login dulu" });
    }
    const token = request.headers.authorization.replace("Bearer ", "");
    const userToken = verifyToken(token);
    const findUser = await userModel.findOne({ _id: userToken.id });
    const { _id, isActive, isDeleted } = findUser;
    if (userToken.id == _id && isActive && !isDeleted) {
      next();
    } else {
      next({ name: "UnauthorizedError", message: "Silahkan login dulu" });
    }
  } catch (error) {
    next(error);
    // response.status(500).json({ message: "Internal server error" });
  }
};
