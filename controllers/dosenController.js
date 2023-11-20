"use strict";
const dosenModel = require("../models/dosenSchema");

class DosenController {
  static async addDosen(request, response, next) {
    const dosen = new dosenModel(request.body);
    try {
      await dosen.save();
      response.status(200).json({ dosen });
    } catch (error) {
      next(error);
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
      next(error);
    }
  }

  static async getOneDosen(request, response, next) {
    try {
      const { id } = request.params;
      const findDosen = await dosenModel.findOne({ _id: id });
      response.status(200).json({ dosen: findDosen });
    } catch (error) {
      next(error);
    }
  }

  static async editDosen(request, response, next) {
    try {
      const { id } = request.params;
      const { nama, gender, nip, image } = request.body;
      const findDosen = await dosenModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (findDosen._id == id) {
        const updateDosen = await dosenModel.findOneAndUpdate(
          { _id: id },
          {
            nama,
            gender,
            nip,
            image,
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ dosen: updateDosen });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteDosen(request, response, next) {
    try {
      const { idDosen } = request.body;
      const dosen = await dosenModel.findOne({
        _id: idDosen,
        isDeleted: false,
      });

      if (dosen._id == idDosen) {
        const deleteDosen = await dosenModel.findOneAndUpdate(
          { _id: idDosen },
          {
            isDeleted: true,
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ dosen: deleteDosen });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DosenController;
