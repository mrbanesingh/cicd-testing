import { inject, injectable } from "inversify";
import { ICategoryService } from "./ICategoryService";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import { IMessageBrokerService } from "../../../integrations/message-broker/IMessageBrokerService";
import { ICategoryModel } from "../models/ICategoryModel";
import { response } from "express";
import RabbitMQPublishers from "../../../_COMMON/rabbitmq-publishers-config";

@injectable()
export class CategoryService implements ICategoryService {
  private repository: ICategoryRepository;
  private messageBrokerService: IMessageBrokerService;

  constructor(
    @inject(IDENTIFIER.ICategoryRepository) repository: ICategoryRepository,
    @inject(IDENTIFIER.IMessageBrokerService)
    messageBrokerService: IMessageBrokerService
  ) {
    this.repository = repository;
    this.messageBrokerService = messageBrokerService;
  }
  async getCategory(offset: number, limit: number, search: string): Promise<ICategoryModel[]> {
    try {
      return await this.repository.findAll(offset, limit, search);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async updateCategory(categoryCode: string, data: ICategoryModel): Promise<ICategoryModel | null> {
    try {
      const result = await this.repository.update(categoryCode, data);
      const userId = data.updated_by;
      await this.publishCategoryMessage(
        userId,
        result,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EXCHANGE_NAME,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EVENT_UPDATE_CATEGORY
      );
      return result;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async deleteCategory(categoryCode: any, data: Partial<ICategoryModel>): Promise<any> {
    try {
      const result = await this.repository.delete(categoryCode, data);
      const userId = data.updated_by;
      await this.publishCategoryMessage(
        userId!,
        result,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EXCHANGE_NAME,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EVENT_DELETE_CATEGORY
      );
      return result;
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }
  async checkCategoryByCode(categoryCode: string): Promise<ICategoryModel | null> {
    try {
      return await this.repository.findByCode(categoryCode);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createCategory(input: any): Promise<any> {
    try {
      const result = await this.repository.create(input);
      const userId = input.created_by;
      await this.publishCategoryMessage(
        userId,
        result,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EXCHANGE_NAME,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EVENT_CREATE_CATEGORY
      );
      return result;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /***** THIS METHODS IS USED TO PUBLISH DATA TO OTHER MICROSERVICES ****/

  private async publishCategoryMessage(userId: string, data: any, exchange: string, event: string): Promise<void> {
    if (data != null) {
      const payload = await this.getCategoryPayload(userId, data);
      console.log(event);

      await this.messageBrokerService.publish(
        exchange, // "events_exchange",
        event, // routing key
        JSON.stringify(payload)
      );
    }
  }

  async getCategoryPayload(userId: string, input: any) {
    try {
      if (input) {
        const payload = {
          data: { userId, input },
        };

        return payload;
      } else {
        return { error: "No Category Available" };
      }
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }
}
