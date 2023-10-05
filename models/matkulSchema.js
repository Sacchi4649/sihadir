const mongoose = require("mongoose");

const matkulSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const mataKuliah = mongoose.model(null, matkulSchema, "mata_kuliah");

module.exports = mataKuliah;
