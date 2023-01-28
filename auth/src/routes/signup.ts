import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../../error/database-connection-error";
import { RequesValidationError } from "../../error/request-validation";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   return res.status(400).send(error.array());
      //   throw new Error("Invalid eamil or password");
      // const error=new Error("Invaild email or password")
      // error.reason=errors.array()
      // throw error
      throw new RequesValidationError(errors.array());
    }
    const { email, password } = req.body;
    // // Just for Checking
    // throw new Error("Error Checking DB...");
    throw new DatabaseConnectionError();

    res.send("User Sign up User");
  }
);
export { router as signupUserRouter };
