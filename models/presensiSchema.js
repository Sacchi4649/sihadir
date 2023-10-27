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
      tye: String,
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
      nip: { type: String },
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Presensi = mongoose.model("presensi", presensiSchema);

module.exports = Presensi;
