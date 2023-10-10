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
      const { limit = 10, offset = 0 } = request.query;
      const findDosen = await dosenModel
        .find({ isDeleted: false })
        .limit(limit)
        .skip(offset);
      const count = await dosenModel.count();
      const pagination = {
        page: offset ? offset / limit + 1 : 1,
        per_page: limit * 1,
        total_data: count,
      };
      response.status(200).json({ dosen: findDosen, pagination });
    } catch (error) {
      response.status(500).json({ message: "Internal serer error" });
    }
  }

  static async getOneDosen(request, response, next) {
    try {
      const { id } = request.params;
      const findDosen = await dosenModel.findOne({ _id: id });
      response.status(200).json({ dosen: findDosen });
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = DosenController;
