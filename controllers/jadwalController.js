"use strict";

const jadwalModel = require("../models/jadwalSchema");
const dosenModel = require("../models/dosenSchema");
const matkulModel = require("../models/matkulSchema");

class JadwalController {
  static async addJadwal(request, response, next) {
    try {
      const {
        hari,
        jam_mulai,
        jam_selesai,
        ruang,
        kelas,
        semester,
        tahun,
        idDosen,
        idMatakuliah,
      } = request.body;

      const dosen = await dosenModel.findOne({ _id: idDosen });
      const matakuliah = await matkulModel.findOne({ _id: idMatakuliah });

      const jadwal = new jadwalModel({
        hari,
        jam_mulai,
        jam_selesai,
        ruang,
        kelas,
        semester,
        tahun,
        dosen: { id: dosen._id, nama: dosen.nama, nip: dosen.nip },
        matakuliah: {
          id: matakuliah._id,
          nama: matakuliah.nama,
          semester: matakuliah.semester,
        },
      });

      await jadwal.save();
      response.status(200).json({ jadwal });
    } catch (error) {
      next(error);
    }
  }

  static async getAllJadwal(request, response, next) {
    try {
      const { limit = 10, offset = 0, search = "" } = request.query;
      const findJadwal = await jadwalModel
        .find({
          $or: [
            { matakuliah: { $regex: new RegExp(search, "i") } },
            { dosen: { $regex: new RegExp(search, "i") } },
            { kelas: { $regex: new RegExp(search, "i") } },
          ],
        })
        .limit(limit)
        .skip(offset);

      const count = await jadwalModel
        .find({
          $or: [
            { matakuliah: { $regex: new RegExp(search, "i") } },
            { dosen: { $regex: new RegExp(search, "i") } },
            { kelas: { $regex: new RegExp(search, "i") } },
          ],
        })
        .count();
      const pagination = {
        page: offset ? offset / limit + 1 : 1,
        per_page: limit * 1,
        total_data: count,
      };
      response.status(200).json({ jadwal: findJadwal, pagination });
    } catch (error) {
      next(error);
    }
  }

  static async editJadwal(request, response, next) {
    try {
      const { id } = request.params;
      const {
        hari,
        jam_mulai,
        jam_selesai,
        ruang,
        kelas,
        semester,
        tahun,
        idDosen,
        idMatakuliah,
      } = request.body;

      const findJadwal = await jadwalModel.findOne({ _id: id });
      if (findJadwal._id == id) {
        const dosen = await dosenModel.findOne({ _id: idDosen });
        const matakuliah = await matkulModel.findOne({ _id: idMatakuliah });
        const updateJadwal = await jadwalModel.findOneAndUpdate(
          { _id: id },
          {
            hari,
            jam_mulai,
            jam_selesai,
            ruang,
            kelas,
            semester,
            tahun,
            dosen: { id: dosen._id, nama: dosen.nama, nip: dosen.nip },
            matakuliah: {
              id: matakuliah._id,
              nama: matakuliah.nama,
              semester: matakuliah.semester,
            },
          },
          {
            new: true,
            upsert: true,
          }
        );
        response.status(200).json({ jadwal: updateJadwal });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = JadwalController;
