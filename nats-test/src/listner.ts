import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TiketCreatedListner } from "./events/ticket-listner";

console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listner is connect");

  stan.on("close", () => {
    console.log("NATS Connection closed");
    process.exit();
  });

  // const subscribtionOptions = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName("order-service");

  // const substrbtion = stan.subscribe(
  //   "ticket:created",
  //   "order-service-queue-group",
  //   subscribtionOptions
  // );
  // substrbtion.on("message", (msg: Message) => {
  //   const data = msg.getData();
  //   if (typeof data === "string") {
  //     console.log(
  //       `Reved event : ${msg.getSequence()} with data: ${JSON.parse(data)} `
  //     );
  //   }
  //   msg.ack();
  // });

  new TiketCreatedListner(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
