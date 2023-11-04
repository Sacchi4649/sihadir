module.exports = statusCounter = (count) => {
  if (count >= 16) return "sp1";
  if (count >= 32) return "sp2";
  if (count > 46) "d0";
  return "";
};
