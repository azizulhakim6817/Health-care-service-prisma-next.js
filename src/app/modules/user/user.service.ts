import { Request } from "express";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = uploadResult?.secure_url;
    //console.log({ uploadResult });
  }
  const saltRounds = Number(config.hash_salt);
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  const result = await prisma.$transaction(async (tnx) => {
    // 1️⃣ user
    await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashedPassword,
      },
    });

    // 2️⃣ patient
    return await tnx.patient.create({
      data: req.body.patient,
    });
  });

  return result;
};

export const UserService = { createPatient };
