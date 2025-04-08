import { PrismaContactsRepository } from "repositories/prisma/prisma-contacts-repository";
import { PrismaCultivationsRepository } from "../../repositories/prisma/prisma-cultivations-repository";
import { CreateCultivationUseCase } from "../create-cultivation";
import { CreateContactUseCase } from "use-cases/create-contact";

export function makeCreateContactUseCase() {
  const contactsRepository = new PrismaContactsRepository();
  const useCase = new CreateContactUseCase(contactsRepository);

  return useCase;
}
