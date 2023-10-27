"use strict";
const presensiModel = require("../models/presensiSchema");

class presensiController {
  static async getPresensi(request, response, next) {
    try {
      const { limit = 10, offset = 0, search = "" } = request.query;
      const findPresensi = await presensiModel
        .find({
          $or: [{ status: { $regex: new RegExp(search, "i") } }],
        })
        .limit(limit)
        .skip(offset);
      const count = await presensiModel
        .find({
          $or: [{ status: { $regex: new RegExp(search, "i") } }],
        })
        .count();
      const pagination = {
        page: offset ? offset / limit + 1 : 1,
        per_page: limit * 1,
        total_data: count,
      };
      response.status(200).json({ presensi: findPresensi, pagination });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = presensiController;
