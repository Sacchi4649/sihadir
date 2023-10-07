const mongoose = require("mongoose");
mongoose.pluralize(null);
const mahasiswaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    umur: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
    },
    nim: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
