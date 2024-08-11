import { injectable } from "inversify";
import { IMessageBrokerService } from "../IMessageBrokerService";
import { Kafka, Producer, Consumer, logLevel } from "kafkajs";

@injectable()
export class KafkaService implements IMessageBrokerService {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID!,
      brokers: process.env.KAFKA_BROKERS!.split(","),
      logLevel: logLevel.INFO,
    });
  }

  async connect(): Promise<void> {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    console.log("Kafka producer connected!");
  }

  async setupInitial(): Promise<void> {
    // Kafka topics are usually created automatically when first used, so no setup is needed here.
  }

  async publish(
    topic: string,
    routingKeyOrTopic: string,
    message: string
  ): Promise<void> {
    if (!this.producer) {
      await this.connect(); // Ensure producer is connected
    }
    if (this.producer) {
      // Check if producer is not null
      await this.producer.send({
        topic: topic,
        messages: [{ key: routingKeyOrTopic, value: message }],
      });
    } else {
      throw new Error("Producer is not initialized");
    }
  }

  async consume(topic: string, callback: (msg: any) => void): Promise<void> {
    this.consumer = this.kafka.consumer({ groupId: "my-group" });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value !== null) {
          callback(message.value.toString());
        }
      },
    });
  }

  async closeConnection(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
    }
    if (this.consumer) {
      await this.consumer.disconnect();
    }
  }

  getChannel(): any {
    return null; // Kafka does not use channels like RabbitMQ
  }
}
