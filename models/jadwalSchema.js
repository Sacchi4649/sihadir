const mongoose = require("mongoose");

const jadwalSchema = new mongoose.Schema({});

const Jadwal = mongoose.model("Jadwal", jadwalSchema);
module.exports = Jadwal;
