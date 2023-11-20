module.exports = async (request, _, next) => {
  try {
    //authorization mahasiswa
    if (request.userRole == "mahasiswa") {
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
