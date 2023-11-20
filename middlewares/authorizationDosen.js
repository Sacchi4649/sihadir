module.exports = async (request, _, next) => {
  try {
    //authorization dosen
    if (request.userRole == "dosen") {
      next();
    } else {
      throw {
        message: "Tidak ada izin akses",
        name: "UnauthorizedError",
      };
    }
  } catch (error) {
    next(error);
  }
};
