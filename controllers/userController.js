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

      if (checkAvailaibility)
        // throw langsung melempar ke catch (seperti break)
        throw {
          name: "ConflictError",
          message: "Username telah dibuat",
        };

      if (role == "mahasiswa") {
        if (!(await mahasiswaModel.findOne({ nim: username }))) {
          throw {
            message: "Username tidak tersedia",
            name: "BadRequestError",
          };
        }
        await user.save();
        response.status(200).json({ user });
      } else if (role == "dosen") {
        if (!(await dosenModel.findOne({ nip: user.username }))) {
          throw {
            message: "Username tidak tersedia",
            name: "BadRequestError",
          };
        }
        await user.save();
        response.status(200).json({ user });
      } else if (role == "admin") {
        await user.save();
        response.status(200).json({ user });
      }
    } catch (error) {
      next(error);
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
      next(error);
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
      // response.render("user", { findUser, title: "tes user" });
    } catch (error) {
      next(error);
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
      next(error);
    }
  }

  static async editUser(request, response, next) {
    try {
      const { id } = request.params;
      const { username, role, isActive, image } = request.body;
      const findUser = await userModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (findUser._id == id) {
        const updateUser = await userModel.findOneAndUpdate(
          { _id: id },
          {
            username,
            role,
            isActive,
            image,
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ user: updateUser });
      }
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(request, response, next) {
    try {
      const userId = request.userId;
      const { password } = request.body;
      await userModel.findOneAndUpdate(
        { _id: userId },
        {
          password: passwordEncryption(password),
        },
        {
          new: true,
          upsert: true,
        }
      );
      response.status(200).json({ message: "Password berhasil diubah!" });
    } catch (error) {
      next(error);
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
      next(error);
    }
  }
}

module.exports = UserController;
