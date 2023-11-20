module.exports = async (request, _, next) => {
  try {
    //authorization dosen
    if (request.userRole == "dosen") {
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
