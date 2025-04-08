import { Cultivation } from "@prisma/client";
import { CultivationsRepository } from "repositories/cultivations-repository";



export class FetchCultivationsAllUseCase{

    constructor(private cultivationsRepository: CultivationsRepository){}

    async execute(): Promise<Cultivation[]>{
        const allCultivations = await this.cultivationsRepository.findAllCultivations();
        return allCultivations
    }
}