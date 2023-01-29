import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "../error/not-found-error";

const app = express();
app.set("truct proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //for https need true
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

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY Must me define");
  }
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Mongo DB Connection Done");
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log("Auth-Service is Listing on Port 5000!!!");
  });
};

start();
