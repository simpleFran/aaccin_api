import { PrismaContactsRepository } from "repositories/prisma/prisma-contacts-repository";
import { FetchContactsAllUseCase } from "use-cases/fetch-contacts-all";

export function makeFetchAllContactsUseCase() {
  const contactsRepository = new PrismaContactsRepository();
  const useCase = new FetchContactsAllUseCase(contactsRepository);

  return useCase;
}
