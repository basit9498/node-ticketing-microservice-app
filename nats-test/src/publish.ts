import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publish";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

// insread asy await use event listner

stan.on("connect", async () => {
  console.log("Publisher connect to NATS");
  // const data = JSON.stringify({
  //   id: "123",
  //   title: "ada",
  //   price: 12,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event Published");
  // });
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "ada",
      price: 12,
    });
  } catch (err) {
    console.error(err);
  }
});
