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
      id: { type: String },
      hari: {
        type: String,
        enum: ["senin", "selasa", "rabu", "kamis", "jumat"],
      },
      jam_mulai: {
        type: String,
      },
      jam_selesai: {
        type: String,
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
      },
      kelas: {
        type: String,
      },
      tahun: {
        type: String,
      },
      dosen_pengampu: {
        id: { type: String },
        nama: { type: String },
        nip: { type: String },
      },
      matakuliah: {
        id: { type: String },
        nama: { type: String },
        semester: { type: String },
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
