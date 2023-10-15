"use strict";
const matkulModel = require("../models/matkulSchema");

class MatkulController {
  static async addMatkul(request, response, next) {
    const { nama, semester, isActive } = request.body;
    const matkul = new matkulModel({
      nama,
      semester,
      isActive,
    });
    try {
      await matkul.save();
      response.status(200).json({ matkul });
    } catch (error) {
      next(error);
    }
  }

  static async getAllMatkul(request, response, next) {
    try {
      const { limit = 10, offset = 0, search = "" } = request.query;
      const findMatkul = await matkulModel
        .find({
          $or: [
            { nama: { $regex: new RegExp(search, "i") } },
            { semester: { $regex: new RegExp(search, "i") } },
          ],
        })
        .limit(limit)
        .skip(offset);
      const count = await matkulModel
        .find({
          $or: [
            { nama: { $regex: new RegExp(search, "i") } },
            { semester: { $regex: new RegExp(search, "i") } },
          ],
        })
        .count();
      const pagination = {
        page: offset ? offset / limit + 1 : 1,
        per_page: limit * 1,
        total_data: count,
      };
      response.status(200).json({ matkul: findMatkul, pagination });
    } catch (error) {
      next(error);
    }
  }

  static async editMatkul(request, response, next) {
    try {
      const { id } = request.params;
      const { nama, semester, isActive } = request.body;
      const findMatkul = await matkulModel.findOne({ _id: id });
      if (findMatkul._id == id) {
        const updateMatkul = await matkulModel.findOneAndUpdate(
          { _id: id },
          { nama, semester, isActive },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ matkul: updateMatkul });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MatkulController;
// add, get all, edit
