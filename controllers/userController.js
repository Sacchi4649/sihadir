"use strict";

const mahasiswaModel = require("../models/mahasiswaSchema");
const dosenModel = require("../models/dosenSchema");

class UserController {
  static async login(request, response, next) {
    try {
      const { nama, password } = request.body;
      const findMahasiswa = await mahasiswaModel.findOne({ nama: nama }).exec();
      const findDosen = await dosenModel.findOne({ nama: nama }).exec();

      if (findMahasiswa) {
        if (findMahasiswa.password == password) {
          response.status(200).json({ message: "Login mahasiswa berhasil" });
        } else {
          response.status(400).json({ message: "Username/Password salah!" });
        }
      } else if (findDosen) {
        if (findDosen.password == password) {
          response.status(200).json({ message: "Login dosen berhasil" });
        } else {
          response.status(400).json({ message: "Username/Password salah!" });
        }
      } else {
        response.status(400).json({ message: "Username/Password salah!" });
      }
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
      return;
    }
  }
}

module.exports = UserController;
// login
// logout
