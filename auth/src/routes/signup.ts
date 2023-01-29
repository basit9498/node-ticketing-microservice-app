import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../../error/bad-request-error";
import { DatabaseConnectionError } from "../../error/database-connection-error";
import { RequesValidationError } from "../../error/request-validation";
import { User } from "../model/user";
import jwt from "jsonwebtoken";
import { validateResult } from "../middleware/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must me 4 to 20"),
  ],
  validateResult,
  async (req: Request, res: Response) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   //   return res.status(400).send(error.array());
    //   //   throw new Error("Invalid eamil or password");
    //   // const error=new Error("Invaild email or password")
    //   // error.reason=errors.array()
    //   // throw error
    //   throw new RequesValidationError(errors.array());
    // }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // return res.status(203).send("Email is Exisiting");
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });

    await user.save();

    // Geneate JWt
    // if (!process.env.JWT_KEY) {
    //   throw new Error("JWT Not Founded");
    // }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);

    // // Just for Checking
    // throw new Error("Error Checking DB...");
    // throw new DatabaseConnectionError();

    // res.send("User Sign up User");
  }
);
export { router as signupUserRouter };
