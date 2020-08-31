import { IEmailProvider, IMessage } from '../IEmailProvider';

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailTrapMailProvider implements IEmailProvider {
  
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'a9290e4f2f1292',
        pass: '9c7ee79ed06159'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }

}