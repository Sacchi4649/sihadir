"use strict";

const mahasiswaModel = require("../models/mahasiswaSchema");
const dosenModel = require("../models/dosenSchema");
const userModel = require("../models/userSchema");

class UserController {
  static async createUser(request, response, next) {
    const user = new userModel(request.body);
    try {
      const username = request.body.username;
      const role = request.body.role;
      const checkAvailaibility = await userModel.findOne({
        username: username,
      });
      if (!checkAvailaibility) {
        if (role == "mahasiswa") {
          if (await mahasiswaModel.findOne({ nim: username })) {
            await user.save();
            response.status(200).json({ user });
          } else {
            response.status(400).json({ message: "Username tidak tersedia" });
          }
        } else if (role == "dosen") {
          if (await dosenModel.findOne({ nip: username })) {
            await user.save();
            response.status(200).json({ user });
          } else {
            response.status(400).json({ message: "Username tidak tersedia" });
          }
        }
      } else {
        response.status(400).json({ message: "Username telah dibuat" });
      }
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(request, response, next) {
    try {
      const { nama, password } = request.body;
      const findMahasiswa = await mahasiswaModel.findOne({ nama: nama });
      const findDosen = await dosenModel.findOne({ nama: nama });
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
