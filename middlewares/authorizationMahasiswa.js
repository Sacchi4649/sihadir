module.exports = async (request, _, next) => {
  try {
    //authorization mahasiswa
    if (request.userRole == "mahasiswa") {
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
