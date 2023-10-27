module.exports = getHari = (number) => {
  switch (number) {
    case 0:
      return "minggu";
    case 1:
      return "senin";
    case 2:
      return "selasa";
    case 3:
      return "rabu";
    case 4:
      return "kamis";
    case 5:
      return "jumat";
    case 6:
      return "sabtu";
    default:
      break;
  }
};
