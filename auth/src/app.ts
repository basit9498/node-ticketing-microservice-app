import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./error/not-found-error";

const app = express();
app.set("truct proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: false, //for https need true
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
