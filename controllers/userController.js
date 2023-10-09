"use strict";

const mahasiswaModel = require("../models/mahasiswaSchema");
const dosenModel = require("../models/dosenSchema");
const userModel = require("../models/userSchema");
const {
  passwordEncryption,
  passwordValidation,
} = require("../utils/passwordHandler");

class UserController {
  static async addUser(request, response, next) {
    const user = new userModel({
      username: request.body.username,
      password: passwordEncryption(request.body.password),
      role: request.body.role,
    });

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
          if (await dosenModel.findOne({ nip: user.username })) {
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

  static async getAllUser(request, response, next) {
    try {
      const findUser = await userModel.find();
      response.status(200).json({ user: findUser });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOneUser(request, response, next) {
    try {
      const { id } = request.params;
      const findUser = await userModel.findOne({ _id: id });
      response.status(200).json({ user: findUser });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
  static async login(request, response, next) {
    try {
      const { username, password } = request.body;

      const findUsername = await userModel.findOne({ username: username });

      if (findUsername) {
        if (findUsername.password == password) {
          console.log(findUsername);
          if (findUsername.role == "mahasiswa") {
            response.status(200).json({ message: "Login mahasiswa berhasil" });
          } else if (findUsername.role == "dosen") {
            response.status(200).json({ message: "Login dosen berhasil" });
          }
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
