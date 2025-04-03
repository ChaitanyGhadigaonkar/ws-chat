import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { SIGNUP_SCHEMA } from "../schema/auth";
import prisma from "../config/db/prisma";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = await SIGNUP_SCHEMA.validateAsync(req.body);

  const isExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isExists) {
    throw new Error("Email is already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      thirdPartyLogin: false,
      Profile: {
        create: {},
      },
    },
    omit: {
      password: true,
    },
  });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

export { registerUser };
