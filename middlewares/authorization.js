module.exports = async (request, _, next) => {
  try {
    //authorization mahasiswa
    if (
      (request.userRole == "mahasiswa" && request.baseUrl == "/presensi") ||
      (request.userRole == "mahasiswa" && request.baseUrl == "/jadwal") ||
      (request.userRole == "mahasiswa" && request.baseUrl == "/matakuliah") ||
      (request.userRole == "mahasiswa" &&
        request.baseUrl == "/user" &&
        request.path == "/" + request.userId) ||
      (request.userRole == "mahasiswa" &&
        request.originalUrl == "/user/changepassword/")
    ) {
      next();
    }
    //authorization dosen
    else if (
      (request.userRole == "dosen" && request.baseUrl == "/matakuliah") ||
      (request.userRole == "dosen" && request.baseUrl == "/jadwal") ||
      (request.userRole == "dosen" &&
        request.originalUrl == "/presensi/alpha") ||
      (request.userRole == "dosen" &&
        request.originalUrl == "/presensi/dosen") ||
      (request.userRole == "dosen" &&
        request.originalUrl == "/user/changepassword/")
    ) {
      next();
    }
    //authorization admin
    else if (
      (request.userRole == "admin" && request.baseUrl == "/mahasiswa") ||
      (request.userRole == "admin" && request.baseUrl == "/dosen") ||
      (request.userRole == "admin" && request.baseUrl == "/user") ||
      (request.userRole == "admin" && request.baseUrl == "/matakuliah") ||
      (request.userRole == "admin" && request.baseUrl == "/jadwal") ||
      (request.userRole == "admin" && request.baseUrl == "/presensi")
    ) {
      next();
    } else {
      next({ name: "UnauthorizedError", message: "Tidak ada izin akses" });
    }
  } catch (error) {
    next(error);
  }
};
