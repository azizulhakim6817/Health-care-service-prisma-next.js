import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../helper/jwtHelper";

const login = async (payload: { email: string; password: string }) => {
  //find user data--------
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  // pasword matching--------------
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect!");
  }

  const needPasswordChange = user.needPasswordChange;

  //access token -> jsonweb-----------
  const accessToken = await jwtHelper.generateToken(
    { email: user.email, role: user.role },
    "abcd",
    "3d"
  );

  //refresh token -> jsonweb ----------
  const refreshToken = await jwtHelper.generateToken(
    { email: user.email, role: user.role },
    "refresh",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

export const AuthService = { login };
