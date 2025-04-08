import { PrismaCultivationsRepository } from "../../repositories/prisma/prisma-cultivations-repository";
import { CreateCultivationUseCase } from "../create-cultivation";

export function makeCreateCultivationUseCase() {
  const cultivationsRepository = new PrismaCultivationsRepository();
  const useCase = new CreateCultivationUseCase(cultivationsRepository);

  return useCase;
}
