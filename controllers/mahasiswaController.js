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
      const findMahasiswa = await mahasiswaModel.find();
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
