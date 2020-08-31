import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const mailtrapMailProvider = new MailTrapMailProvider();
const usersRepositories = new UserRepository();

const createUserUseCase = new CreateUserUseCase(usersRepositories, mailtrapMailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController }
