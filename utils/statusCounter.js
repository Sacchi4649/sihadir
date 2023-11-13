module.exports = statusCounter = (count) => {
  if (count < 16) return "";
  if (count >= 16 && count < 32) return "sp1";
  if (count >= 32 && count <= 46) return "sp2";
  return "do";
};
