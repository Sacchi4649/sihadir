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
  slot: { type: Object, required: true },
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
  dosen_pengampu: {
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
