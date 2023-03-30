const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1].match(/jpg|png|jpeg|webp/)) {
    return cb(null, true);
  }
  const err = new Error("Invalid filetype");
  err.status = 422;
  return cb(err, null);
};

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

module.exports = upload;
