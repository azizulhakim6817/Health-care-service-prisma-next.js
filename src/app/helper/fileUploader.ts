import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// cloudinary-------------------------------------------------------------
const uploadToCloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: "dlksmhtmq",
    api_key: "928197971661335",
    api_secret: "EmLB5blBQCKCsM36ZzF25ARtlKw",
  });
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(file.path, {
      public_id: file.filename,
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult;
};

export const fileUploader = { upload, uploadToCloudinary };
