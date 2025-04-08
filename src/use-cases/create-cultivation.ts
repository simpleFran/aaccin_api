import { Cultivation } from "@prisma/client";
import { CultivationsRepository } from "../repositories/cultivations-repository";

interface CreateCultivationUseCaseRequest {
  name: string;
  description: string | null;
}

interface CreateCultivationUseCaseResponse {
  cultivation: Cultivation | {error:string};
}

export class CreateCultivationUseCase {
  constructor(private cultivationsRepository: CultivationsRepository) {}

  async execute({
    name,
    description,
  }: CreateCultivationUseCaseRequest): Promise<CreateCultivationUseCaseResponse> {
    const cultivation = await this.cultivationsRepository.create({
        name,description
    })
    return {cultivation}
  }
}
