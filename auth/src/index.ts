import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinUserRouter } from "./routes/signin";
import { signoutUserRouter } from "./routes/signout";
import { signupUserRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "../error/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
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
