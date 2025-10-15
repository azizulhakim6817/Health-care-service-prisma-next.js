import { Secret, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const generateToken = async (
  payload: any,
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  } as SignOptions);
  return token;
};

export const jwtHelper = { generateToken };
