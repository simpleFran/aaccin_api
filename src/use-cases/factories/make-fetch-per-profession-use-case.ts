import { PrismaContactsRepository } from "repositories/prisma/prisma-contacts-repository";
import { FetchContactPerCultivationUseCase } from "use-cases/fetch-contacts-per-cultivation";
import { FetchContactsPerProfessionUseCase } from "use-cases/fetch-contacts-per-profession";

export function makeFetchPerProfessionUseCase() {
  const contactsRepository = new PrismaContactsRepository();
  const useCase = new FetchContactsPerProfessionUseCase(contactsRepository);
  return useCase;
}
