import { PrismaContactsRepository } from "repositories/prisma/prisma-contacts-repository";
import { FetchContactPerCultivationUseCase } from "use-cases/fetch-contacts-per-cultivation";

export function makeFetchPerCultivationUseCase() {
  const contactsRepository = new PrismaContactsRepository();
  const useCase = new FetchContactPerCultivationUseCase(contactsRepository);
  return useCase;
}
