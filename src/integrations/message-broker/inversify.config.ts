import { ContainerModule, interfaces } from "inversify";
import { IMessageBrokerService } from "./IMessageBrokerService";
import { RabbitMQService } from "./providers/RabbitMQService";
import { IDENTIFIER } from "../../common/constants/identifiers";
import { KafkaService } from "./providers/KafkaService";

const MessagingBrokerContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IMessageBrokerService>(IDENTIFIER.IMessageBrokerService).to(
      RabbitMQService
    );
  }
);

export { MessagingBrokerContainer };
