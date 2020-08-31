import { User } from "../../models/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IEmailProvider } from "../../providers/IEmailProvider";

export class CreateUserUseCase {

  private usersRepository: IUserRepository;
  private mailProvider: IEmailProvider

  constructor(usersRepository: IUserRepository, mailProvider: IEmailProvider) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
  }

  async execute(data:ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error ('User already exists');
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'SOLID Sender',
        email: 'solid@typescript.com',
      },
      subject: 'Welcome to this platform',
      body: '<p>This is a test email after your register</p>'
    })
  }
}