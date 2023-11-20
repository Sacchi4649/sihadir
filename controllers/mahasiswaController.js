"use strict";
const mahasiswaModel = require("../models/mahasiswaSchema");

class MahasiswaController {
  static async addMahasiswa(request, response, next) {
    const mahasiswa = new mahasiswaModel(request.body);
    try {
      await mahasiswa.save();
      response.status(200).json({ mahasiswa });
    } catch (error) {
      next(error);
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
      next(error);
    }
  }
  static async getOneMahasiswa(request, response, next) {
    try {
      const { id } = request.params;
      const findMahasiswa = await mahasiswaModel.findOne({
        _id: id,
      });
      response.status(200).json({ mahasiswa: findMahasiswa });
    } catch (error) {
      next(error);
    }
  }

  static async getProfileMahasiswa(request, response, next) {
    try {
      const { nim } = request.params;
      const findMahasiswa = await mahasiswaModel.findOne({
        nim: nim,
      });
      response.status(200).json({ mahasiswa: findMahasiswa });
    } catch (error) {
      next(error);
    }
  }

  static async editMahasiswa(request, response, next) {
    try {
      const { id } = request.params;
      const { nama, gender, nim, kelas, semester, image } = request.body;
      const findMahasiswa = await mahasiswaModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (findMahasiswa._id == id) {
        const updateMahasiswa = await mahasiswaModel.findOneAndUpdate(
          { _id: id },
          {
            nama,
            gender,
            nim,
            kelas,
            semester,
            image,
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ mahasiswa: updateMahasiswa });
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteMahasiswa(request, response, next) {
    try {
      const { idMahasiswa } = request.body;
      const mahasiswa = await mahasiswaModel.findOne({
        _id: idMahasiswa,
        isDeleted: false,
      });

      if (mahasiswa._id == idMahasiswa) {
        const deleteMahasiswa = await mahasiswaModel.findOneAndUpdate(
          { _id: idMahasiswa },
          {
            isDeleted: true,
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ mahasiswa: deleteMahasiswa });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MahasiswaController;
