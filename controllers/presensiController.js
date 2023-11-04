"use strict";
const presensiModel = require("../models/presensiSchema");
const mahasiswaModel = require("../models/mahasiswaSchema");
const dosenModel = require("../models/dosenSchema");
const userModel = require("../models/userSchema");
const jadwalModel = require("../models/jadwalSchema");
const getHari = require("../utils/getHari");
const kompensasiCounter = require("../utils/kompensasiCounter");
const statusCounter = require("../utils/statusCounter");

class presensiController {
  static async getPresensi(request, response, next) {
    try {
      const { limit = 10, offset = 0, search = "" } = request.query;
      const userRole = request.userRole;
      const userUsername = request.userUsername;
      const query = {
        $or: [{ status: { $regex: new RegExp(search, "i") } }],
        // nim: userUsername,
      };
      if (userRole == "mahasiswa") {
        query.nim = userUsername;
      }
      const findPresensi = await presensiModel
        .find(query)
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
      const { idJadwal } = request.body;
      const userRole = request.userRole;
      const userId = request.userId;
      const userUsername = request.userUsername;
      const findMahasiswa = await mahasiswaModel.findOne({ nim: userUsername });
      const findJadwal = await jadwalModel.findOne({ _id: idJadwal });
      const date = new Date();
      const day = getHari(date.getDay());
      const hour = `${date.getHours() < 10 ? "0" : ""}:${
        (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
      }`;
      // date.getHours() + ":" + date.getMinutes();
      let telat = -1,
        slotJadwal;

      if (!(userRole != "admin"))
        throw {
          message: "Role admin tidak bisa presensi!",
          name: "ForbiddenError",
        };
      const {
        _id,
        hari,
        jam_mulai,
        jam_selesai,
        slot,
        ruang,
        semester,
        kelas,
        tahun,
        dosen,
        matakuliah,
        surat,
      } = findJadwal;

      if (!(semester == findMahasiswa.semester && kelas == findMahasiswa.kelas))
        throw { message: "Tidak ada kelas", name: "BadRequestError" };
      console.log(hour, jam_mulai);
      if (!(hari == day && hour >= jam_mulai && hour <= jam_selesai))
        throw { message: "Tidak ada jadwal", name: "BadRequestError" };

      for (const key in findJadwal.slot) {
        telat++;
        if (
          hour >= findJadwal.slot[key].mulai &&
          hour <= findJadwal.slot[key].selesai
        ) {
          slotJadwal = key;
          break;
        }
      }
      const hitungStatus = findMahasiswa.total_alpha + telat;
      const hitungKompen = kompensasiCounter(telat);
      const kompen = findMahasiswa.kompensasi + hitungKompen;
      const checkStatus = statusCounter(hitungStatus);
      console.log(kompen, hitungStatus, checkStatus);

      await mahasiswaModel.findOneAndUpdate(
        { nim: userUsername },
        {
          total_alpha: hitungStatus,
          kompensasi: kompen,
          status_sp: checkStatus,
        },
        {
          new: true,
          upsert: true,
        }
      );

      const presensi = new presensiModel({
        status: "hadir",
        waktu_presensi:
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear() +
          " " +
          hour, //dd-mm-yyyy jam:menit
        mahasiswa: {
          id: findMahasiswa._id,
          nama: findMahasiswa.nama,
          nim: findMahasiswa.nim,
          kompensasi_didapat: hitungKompen,
          alpha_didapat: telat,
          status_sp: checkStatus,
        },

        jadwal: {
          id: _id,
          hari,
          jam_mulai,
          jam_selesai,
          slotJadwal: slotJadwal,
          waktuSlot: findJadwal.slot[slotJadwal],
          ruang,
          semester,
          kelas,
          tahun,
          dosen,
          matakuliah,
          surat,
        },
        surat: "",
      });
      console.log(presensi);
      console.log("Kompensasi didapat " + hitungKompen);
      console.log("Total kompensasi " + kompen);
      console.log("Alpha didapat " + telat);
      console.log("Total alpha " + hitungStatus);
      console.log("Status SP " + checkStatus);

      await presensi.save();

      response.status(200).json({ presensi: presensi });
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
