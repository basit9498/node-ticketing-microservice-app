import request from "supertest";
import { app } from "../../app";

// Email and Password body Test
it("fail when a email that is not exist is suuplied", async () => {
  await request(app)
    .post("/api/users/sigin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("fail when an incorrect password is supplied ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/sigin")
    .send({ email: "test@test.com", password: "password1" })
    .expect(400);
});

it("response with cokies when a given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const respose = await request(app)
    .post("/api/users/sigin")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  expect(respose.get("Set-Cookie")).toBeDefined();
});
