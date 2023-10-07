"use strict";
const mahasiswaModel = require("../models/mahasiswaSchema");

class MahasiswaController {
  static async addMahasiswa(request, response, next) {
    const mahasiswa = new mahasiswaModel(request.body);
    try {
      await mahasiswa.save();
      response.status(200).json({ mahasiswa });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = MahasiswaController;
// create;
// edit;
// selectAll;
// Selectone;
// delete flagging;
