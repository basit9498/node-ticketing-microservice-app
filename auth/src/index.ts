import mongoose from "mongoose";

import { app } from "./app";
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
