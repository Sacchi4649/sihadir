const mongoose = require("mongoose");
mongoose.pluralize(null);
const presensiSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["hadir", "sakit", "izin", "alpha"],
      default: "alpha",
    },
    waktu_presensi: {
      type: String,
      required: true,
    },
    dosen: {
      id: { type: String },
      nama: { type: String },
      nip: { type: String },
    },
    mahasiswa: {
      id: { type: String },
      nama: { type: String },
      nim: { type: String },
      kompensasi_didapat: { type: Number },
      alpha_didapat: { type: Number },
      status_sp: { type: String },
    },

    jadwal: {
      id: { type: String, required: true },
      hari: {
        type: String,
        enum: ["senin", "selasa", "rabu", "kamis", "jumat"],
        required: true,
      },
      jam_mulai: {
        type: String,
        required: true,
      },
      jam_selesai: {
        type: String,
        required: true,
      },
      slotJadwal: {
        type: Number,
        required: false,
      },
      waktuSlot: {
        type: Object,
        required: false,
      },
      ruang: {
        type: String,
        required: true,
      },
      kelas: {
        type: String,
        required: true,
      },
      tahun: {
        type: String,
        required: true,
      },
      dosen_pengampu: {
        id: { type: String, required: true },
        nama: { type: String, required: true },
        nip: { type: String, required: true },
      },
      matakuliah: {
        id: { type: String, required: true },
        nama: { type: String, required: true },
        semester: { type: String, required: true },
      },
    },
    surat: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Presensi = mongoose.model("presensi", presensiSchema);

module.exports = Presensi;
