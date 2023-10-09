const bcrypt = require("bcrypt");

const passwordEncryption = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const passwordValidation = (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword);
};

module.exports = { passwordEncryption, passwordValidation };
