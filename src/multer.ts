import { randomUUID } from "crypto";
import multer from "multer";
import path from "path";
import { AppError } from "./errors";
import { storageCloudinary } from "./cloudinary";

const storageType = {
  production: storageCloudinary,
  local: multer.diskStorage({
    destination: path.join(__dirname, "../temp"),
    filename(req, file, callback) {
      callback(
        null,
        `${file.fieldname}-${randomUUID()}-${Date.now()}.${
          file.mimetype.split("/")[1]
        }`
      );
    },
  }),
};

let storage: "local" | "production";
if (process.env.MULTER_STORAGE_TYPE == "production") {
  storage = "production";
} else {
  storage = "local";
}

export const uploadMulter = multer({
  storage: storageType[storage],
  limits: {
    fileSize: 4194304,
  },
  fileFilter(req, file, callback) {
    const formatsAccepted = ["JPG", "JPEG", "PNG"];
    const formatFile = file.mimetype.split("/")[1];

    if (formatsAccepted.includes(formatFile.toUpperCase())) {
      callback(null, true);
    } else {
      callback(new AppError("Unsupported file format", 400));
    }
  },
});
