import express, { Request, Response } from "express";
import { body } from "express-validator";
// import { BadRequestError } from "../error/bad-request-error";
// import { validateResult } from "../middleware/validate-request";

import { BadRequestError, validateResult } from "@ab-ticketing/common";
import { Password } from "../service/password";
import jwt from "jsonwebtoken";
import { User } from "../model/user";

const router = express.Router();

router.post(
  "/api/users/sigin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must Should be Supply..! "),
  ],
  validateResult,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatched = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatched) {
      throw new BadRequestError("Invalid credentails");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(existingUser);
  }
);
export { router as signinUserRouter };
