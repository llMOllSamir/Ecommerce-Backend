import multer from "multer";
import AppError from "../services/appError.js";

let options = () => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("invalid image", 404));
    }
  }

  return multer({ storage, fileFilter });
};

export let singleUpload = (fieldName) => options().single(fieldName);
export let mixedUploads = (fields) => options().fields(fields);
