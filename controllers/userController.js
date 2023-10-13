"use strict";

const mahasiswaModel = require("../models/mahasiswaSchema");
const dosenModel = require("../models/dosenSchema");
const userModel = require("../models/userSchema");
const { generateToken, verifyToken } = require("../utils/jwtHandler");
const {
  passwordEncryption,
  passwordValidation,
} = require("../utils/passwordHandler");

class UserController {
  static async addUser(request, response, next) {
    try {
      const { username, password, role } = request.body;
      const user = new userModel({
        username,
        password: passwordEncryption(password),
        role,
      });
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
        } else if (role == "admin") {
          await user.save();
          response.status(200).json({ user });
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
      const { username, password } = request.body;

      const findUsername = await userModel.findOne({ username: username });
      if (findUsername) {
        if (passwordValidation(password, findUsername.password)) {
          response.status(200).json({
            message: "Login berhasil",
            token: generateToken({
              id: findUsername._id,
              username: findUsername.username,
              role: findUsername.role,
            }),
            username: findUsername.username,
            role: findUsername.role,
          });
        } else {
          response.status(400).json({ message: "Username/Password salah!" });
        }
      } else {
        response.status(400).json({ message: "Username/Password salah!" });
      }
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllUser(request, response, next) {
    try {
      const { limit = 10, offset = 0, search = "" } = request.query;
      const findUser = await userModel
        .find({
          $or: [
            { username: { $regex: new RegExp(search, "i") } },
            { role: { $regex: new RegExp(search, "i") } },
          ],
          isDeleted: false,
        })
        .limit(limit)
        .skip(offset);
      const count = await userModel
        .find({
          $or: [
            { username: { $regex: new RegExp(search, "i") } },
            { role: { $regex: new RegExp(search, "i") } },
          ],
          isDeleted: false,
        })
        .count();
      const pagination = {
        page: offset ? offset / limit + 1 : 1,
        per_page: limit * 1,
        total_data: count,
      };
      response.status(200).json({ user: findUser, pagination });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOneUser(request, response, next) {
    try {
      const { id } = request.params;
      const findUser = await userModel.findOne({
        _id: id,
        isDeleted: false,
      });

      response.status(200).json({ user: findUser });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async editUser(request, response, next) {
    try {
      const { id } = request.params;
      const { username, role } = request.body;
      const userId = await userModel.findOne({ _id: id, isDeleted: false });
      console.log(userId);
      if (userId._id == id) {
        const updateUser = await userModel.findOneAndUpdate(
          { _id: id },
          {
            username,
            role,
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ user: updateUser });
      }
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(request, response, next) {
    try {
      const { id } = request.params;
      const user = await userModel.findOne({ _id: id, isDeleted: false });

      if (user._id == id) {
        const deleteUser = await userModel.findOneAndUpdate(
          {
            isDeleted: true,
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ user: deleteUser });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
