const mongoose = require("mongoose");

const dosenSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    umur: {
      type: Number,
    },
    gender: {
      type: String,
    },
    nip: {
      type: String,
      unique: true,
      required: true,
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

const Dosen = mongoose.model(null, dosenSchema, "dosen");

module.exports = Dosen;
