const unggah = require("unggah");

const storage = unggah.gcs({
  keyFilename: "./serviceaccountkey.json",
  bucketName: "sihadir-images",
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`;
  },
});

const upload = unggah({
  limits: {
    fileSize: 1e15,
  },
  storage: storage,
});

module.exports = upload;
