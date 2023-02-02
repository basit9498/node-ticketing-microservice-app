import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@ab-ticketing/common";
import { createTicketsRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";
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

app.use(createTicketsRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
