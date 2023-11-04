module.exports = kompensasiCounter = (telat) => {
  if (telat === 1) return 5;
  if (telat > 1 && telat <= 8) return 8;
  if (telat > 8) return telat * 2;
  return 0;
};
