import nats, { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subject";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listner<T extends Event> {
  //   abstract subject: string;
  abstract subject: T["subject"];
  abstract queryGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;

  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOtions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queryGroupName);
  }

  listen() {
    const subscribtion = this.client.subscribe(
      this.subject,
      this.queryGroupName,
      this.subscriptionOtions()
    );

    subscribtion.on("message", (msg: Message) => {
      console.log(`Message Revied: ${this.subject} / ${this.queryGroupName}`);
      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
