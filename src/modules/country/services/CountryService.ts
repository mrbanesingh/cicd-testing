import { ICountryModel } from "../models/ICountryModel";
import { ICountryRepository } from "../repositories/ICountryRepository";
import { ICountryService } from "./ICountryService";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import appSetting from "../../../config";
import { IMessageBrokerService } from "../../../integrations/message-broker/IMessageBrokerService";
import { inject, injectable } from "inversify";
import { AppMessages } from "../../../common/constants/AppMessages";
import { FilterParams } from "../models/FilterParams";
import RabbitMQPublishers from "../../../_COMMON/rabbitmq-publishers-config";

@injectable()
export class CountryService implements ICountryService {
  private repository: ICountryRepository;
  private messageBrokerService: IMessageBrokerService;

  constructor(
    @inject(IDENTIFIER.ICountryRepository) repository: ICountryRepository,
    @inject(IDENTIFIER.IMessageBrokerService)
    messageBrokerService: IMessageBrokerService
  ) {
    this.repository = repository;
    this.messageBrokerService = messageBrokerService;

    // /***** Subscribe method ****/
    //this.startMessageListening();
  }

  async createCountry(input: ICountryModel): Promise<any> {
    try {
      let flagUrl = input.flag_url;
      const urlParts = flagUrl.split(AppMessages.AMAZON_DOT_COM_SLASH);
      const flagBaseUrl = urlParts[0] + AppMessages.AMAZON_DOT_COM_SLASH;
      const flagLocationUrl = urlParts[1];
      input.flag_base_url = flagBaseUrl;
      input.flag_location_url = flagLocationUrl;
      const data = await this.repository.create(input);

      /************************ START : Publish Message ******************/
      const userId = input.created_by; // This user ID corresponds to the currently logged-in user.
      await this.publishCountryMessage(
        userId,
        data,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EXCHANGE_NAME,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EVENT_CREATE_COUNTRY
      );
      /************************ END : Publish Message ******************/

      return data;
    } catch (error: any) {
      // Log and throw error with additional context
      throw new Error(`${error}`);
    }
  }

  async updateCountry(countryCode: string, data: Partial<ICountryModel>): Promise<ICountryModel | null> {
    try {
      const result = await this.repository.update(countryCode, data);
      /************************ START : Publish Message ******************/
      const userId = data.updated_by; // This user ID corresponds to the currently logged-in user.
      await this.publishCountryMessage(
        userId!,
        result,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EXCHANGE_NAME,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EVENT_UPDATE_COUNTRY
      );
      /************************ END : Publish Message ******************/
      return result;
    } catch (error: any) {
      // Log and throw error with additional context
      throw new Error(`${error}`);
    }
  }

  async getCountry(filterParams: FilterParams): Promise<any> {
    try {
      return await this.repository.findAll(filterParams);
    } catch (error: any) {
      // Log and throw error with additional context
      throw new Error(`${error}`);
    }
  }

  async checkCountryByCode(countryCode: string): Promise<ICountryModel[] | null> {
    try {
      return await this.repository.findByCode(countryCode);
    } catch (error: any) {
      // Log and throw error with additional context
      throw new Error(`${error}`);
    }
  }

  async deleteCountry(countryCode: string, data: Partial<ICountryModel>): Promise<ICountryModel | null> {
    try {
      const result = await this.repository.delete(countryCode, data);
      /************************ START : Publish Message ******************/
      const userId = data.updated_by; // This user ID corresponds to the currently logged-in user.

      await this.publishCountryMessage(
        userId!,
        result,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EXCHANGE_NAME,
        RabbitMQPublishers.APPSETTING_EXCHANGE.EVENT_DELETE_COUNTRY
      );
      /************************ END : Publish Message ******************/
      return result;
    } catch (error: any) {
      // Log and throw error with additional context
      throw new Error(`${error}`);
    }
  }

  async countryExists(data: Partial<ICountryModel>): Promise<ICountryModel[] | null> {
    try {
      return await this.repository.exists(data);
    } catch (error: any) {
      // Log and throw error with additional context
      throw new Error(`${error}`);
    }
  }

  /***** THIS METHODS IS USED TO PUBLISH DATA TO OTHER MICROSERVICES ****/

  private async publishCountryMessage(userId: string, data: any, exchange: string, event: string): Promise<void> {
    if (data != null) {
      const payload = await this.getCountryPayload(userId, data);
      console.log(event);

      await this.messageBrokerService.publish(
        exchange, // "events_exchange",
        event, // routing key
        JSON.stringify(payload)
      );
    }
  }

  async getCountryPayload(userId: string, input: any) {
    try {
      if (input) {
        const payload = {
          data: { userId, input },
        };

        return payload;
      } else {
        return { error: "No Country Available" };
      }
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }

  /***** END : THIS METHODS IS USED TO PUBLISH DATA TO OTHER MICROSERVICES ****/
}
