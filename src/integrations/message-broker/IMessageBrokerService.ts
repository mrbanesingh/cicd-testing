export interface IMessageBrokerService {
  connect(): Promise<void>; // Ensures connection is established
  setupInitial(): Promise<void>; // Sets up exchanges, queues, and bindings
  publish(exchange: string, routingKey: string, message: string): Promise<void>;
  consume(queue: string, callback: (msg: any) => void): Promise<void>;
  setupConsumerQueue(
    exchange: string,
    binding_key: string,
    queue: string
  ): Promise<void>;

  closeConnection(): Promise<void>;
  getChannel(): any | null;
}
