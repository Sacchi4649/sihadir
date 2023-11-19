module.exports = async (request, _, next) => {
  const { verifyToken } = require("../utils/jwtHandler");
  const userModel = require("../models/userSchema");
  try {
    //memeriksa apakah ada authorization(token) apa tidak
    if (!request.headers.authorization) {
      next({ name: "UnauthorizedError", message: "Silahkan login dulu" });
    }

    const token = request.headers.authorization.replace("Bearer ", "");
    const userToken = verifyToken(token);
    const findUser = await userModel.findOne({ _id: userToken.id });
    const { _id, role, username, isActive, isDeleted } = findUser;
    if (userToken.id == _id && isActive && !isDeleted) {
      request.userId = _id; //request membuat objek baru dengan nama userId yang berisi _id user
      request.userRole = role;
      request.userUsername = username;
      next();
    } else {
      next({ name: "UnauthorizedError", message: "Silahkan login dulu" });
    }
  } catch (error) {
    next(error);
  }
};
