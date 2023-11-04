const mongoose = require("mongoose");
mongoose.pluralize(null);
const jadwalSchema = new mongoose.Schema({
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
  slot: {
    1: { mulai: { type: String }, selesai: { type: String } },
    2: { mulai: { type: String }, selesai: { type: String } },
    3: { mulai: { type: String }, selesai: { type: String } },
    4: { mulai: { type: String }, selesai: { type: String } },
    5: { mulai: { type: String }, selesai: { type: String } },
    6: { mulai: { type: String }, selesai: { type: String } },
    7: { mulai: { type: String }, selesai: { type: String } },
    8: { mulai: { type: String }, selesai: { type: String } },
    9: { mulai: { type: String }, selesai: { type: String } },
    10: { mulai: { type: String }, selesai: { type: String } },
    11: { mulai: { type: String }, selesai: { type: String } },
  },
  ruang: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  tahun: {
    type: String,
    required: true,
  },
  dosen: {
    id: { type: String, required: true },
    nama: { type: String, required: true },
    nip: { type: String, required: true },
  },
  matakuliah: {
    id: { type: String, required: true },
    nama: { type: String, required: true },
    semester: { type: String, required: true },
  },
});

const Jadwal = mongoose.model("jadwal", jadwalSchema);
module.exports = Jadwal;
