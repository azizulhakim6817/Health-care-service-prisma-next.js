import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helper/fileUploader";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = JSON.parse(req.body.data);
      UserValidation.createPatientValidationSchema.parse(req.body);
      return UserController.createPatient(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
export const userRoutes = router;
