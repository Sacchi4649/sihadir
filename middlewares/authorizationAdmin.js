module.exports = async (request, _, next) => {
  try {
    //authorization admin
    if (request.userRole == "admin") {
      next();
    } else {
      throw {
        message: "Tidak ada izin akses",
        name: "ForbiddenError",
      };
    }
  } catch (error) {
    next(error);
  }
};
