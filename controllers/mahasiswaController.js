"use strict";
const mahasiswaModel = require("../models/mahasiswaSchema");

class MahasiswaController {
  static async addMahasiswa(request, response, next) {
    const mahasiswa = new mahasiswaModel(request.body);
    try {
      await mahasiswa.save();
      response.status(200).json({ mahasiswa });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllMahasiswa(request, response, next) {
    try {
      const { limit = 10, offset = 0 } = request.query;
      const findMahasiswa = await mahasiswaModel
        .find({ isDeleted: false })
        .limit(limit)
        .skip(offset);
      const count = await mahasiswaModel.count();
      const pagination = {
        page: offset ? offset / limit + 1 : 1,
        per_page: limit * 1,
        total_data: count,
      };
      response.status(200).json({ mahasiswa: findMahasiswa, pagination });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
  static async getOneMahasiswa(request, response, next) {
    try {
      const { id } = request.params;
      const findMahasiswa = await mahasiswaModel.findOne({ _id: id });
      response.status(200).json({ mahasiswa: findMahasiswa });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = MahasiswaController;
// create;
// edit;
// selectAll;
// Selectone;
// delete flagging;
