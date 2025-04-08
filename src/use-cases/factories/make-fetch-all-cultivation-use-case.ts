


import { PrismaContactsRepository } from "repositories/prisma/prisma-contacts-repository";
import { PrismaCultivationsRepository } from "repositories/prisma/prisma-cultivations-repository";
import { FetchContactsAllUseCase } from "use-cases/fetch-contacts-all";
import { FetchCultivationsAllUseCase } from "use-cases/fetch-cultivations-all";

export function makeFetchAllCultivationsUseCase() {
  const cultivationsRepository = new PrismaCultivationsRepository()
  const useCase = new FetchCultivationsAllUseCase(cultivationsRepository);

  return useCase;
}
