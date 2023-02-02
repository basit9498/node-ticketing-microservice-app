import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY Must me define");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI Must me define");
  }
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB Connection Done");
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log("Auth-Service is Listing on Port 5000!!!");
  });
};

start();
