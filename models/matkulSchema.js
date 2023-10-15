const mongoose = require("mongoose");

const matkulSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const mataKuliah = mongoose.model(null, matkulSchema, "mata_kuliah");

module.exports = mataKuliah;
