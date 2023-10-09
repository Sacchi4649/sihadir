const mongoose = require("mongoose");
mongoose.pluralize(null);
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Dosen = mongoose.model("dosen", dosenSchema);

module.exports = Dosen;
