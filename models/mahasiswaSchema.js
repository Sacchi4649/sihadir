const mongoose = require("mongoose");
mongoose.pluralize(null);
const mahasiswaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    nim: {
      type: String,
      required: true,
      unique: true,
    },
    kelas: {
      type: String,
      enum: ["a", "b", "c", "d", "e", "ic"],
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    kompensasi: {
      type: Number,
      default: 0,
    },
    total_alpha: {
      type: Number,
      default: 0,
    },
    status_sp: {
      type: String,
      enum: ["sp1", "sp2", "sp3", "do", ""],
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Mahasiswa = mongoose.model("mahasiswa", mahasiswaSchema);

module.exports = Mahasiswa;
