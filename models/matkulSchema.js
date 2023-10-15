const mongoose = require("mongoose");
mongoose.pluralize(null);
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

const mataKuliah = mongoose.model("mata_kuliah", matkulSchema);

module.exports = mataKuliah;
