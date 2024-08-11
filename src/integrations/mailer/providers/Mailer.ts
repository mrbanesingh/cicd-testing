import { injectable } from "inversify";
import { IMailer } from "../IMailer";

@injectable()
export class Mailer implements IMailer {
  SendEmail(to: string, product: unknown) {
    // send grid implementation
    console.log("sending email");
    return true;
  }
}
