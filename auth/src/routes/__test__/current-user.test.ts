import request from "supertest";
import { app } from "../../app";

it("response detail about the current user", async () => {
  // const authresponse = await request(app)
  //   .post("/api/users/signup")
  //   .send({ email: "test@test.com", password: "password" })
  //   .expect(201);

  // const cookie = authresponse.get("Set-Cookie");

  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/current-user")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
