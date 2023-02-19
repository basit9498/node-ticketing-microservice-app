import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@ab-ticketing/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("truct proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //for https need true
    // secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createChargeRouter);
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
