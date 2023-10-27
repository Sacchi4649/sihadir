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

  static async isiPresensi(request, response, next) {
    try {
      const { id } = request.params;
      const { status } = request.body;
      const userRole = request.userRole;
      const findPresensi = await presensiModel.findOne({
        _id: id,
      });
      if (userRole) {
        if (findPresensi._id == id) {
          const updatePresensi = await presensiModel.findOneAndUpdate(
            { _id: id },
            {
              status,
            },
            {
              new: true,
              upsert: true,
            }
          );
          response.status(200).json({ presensi: updatePresensi });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async koreksiPresensi(request, response, next) {
    try {
      const { id } = request.params;
      const { status } = request.body;
      const findPresensi = await presensiModel.findOne({
        _id: id,
      });
      if (!status == "hadir") {
        if (findPresensi._id == id) {
          const updatePresensi = await presensiModel.findOneAndUpdate(
            { _id: id },
            {
              status,
              image,
            },
            {
              new: true,
              upsert: true,
            }
          );
          response.status(200).json({ presensi: updatePresensi });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = presensiController;
