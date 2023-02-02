import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../model/tickets";

it("return 404 if ticket not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);

  //   console.log(response.body);
});
it("return  ticket if founded", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "adasd",
      price: 10,
    })
    .expect(201);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("adasd");
  expect(ticketResponse.body.price).toEqual(10);
});
