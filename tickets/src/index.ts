import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY Must me define");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI Must me define");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID Must me define");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL Must me define");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID Must me define");
  }
  mongoose.set("strictQuery", false);
  try {
    // await natsWrapper.connect("ticketing", "123123", "http://nats-srv:4222");
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS Connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

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
