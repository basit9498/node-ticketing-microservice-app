import { Message } from "node-nats-streaming";
import { Listner, OrderCreatedEvent, Subjects } from "@ab-ticketing/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listner<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queryGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}
