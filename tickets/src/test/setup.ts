import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  function signin(): string[];
}

// Access for All
jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "test";
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //build a JWT payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create JWT Token
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build sesssoin Obejcy {jwt:MY_JWT}
  const session = { jwt: token };
  // Turn that session into JSon
  const sessionJSON = JSON.stringify(session);

  //  Take json and encode it as base 64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string that s the cookies
  return [`session=${base64}`];
};
