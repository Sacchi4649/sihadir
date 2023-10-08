"use strict";
const dosenModel = require("../models/dosenSchema");

class DosenController {
  static async addDosen(request, response, next) {
    const dosen = new dosenModel(request.body);
    try {
      await dosen.save();
      response.status(200).json({ dosen });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllDosen(request, response, next) {
    try {
      const findDosen = await dosenModel.find();
      response.status(200).json({ dosen: findDosen });
    } catch (error) {
      response.status(500).json({ message: "Internal serer error" });
    }
  }
}

module.exports = DosenController;
