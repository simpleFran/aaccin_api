import { Cultivation, Prisma } from "@prisma/client";



export interface CultivationsRepository{

    create(data: Prisma.CultivationCreateInput): Promise<Cultivation| {error:string}>;
    findByName(name: string): Promise<Cultivation |null>
    findAllCultivations(): Promise<Cultivation[]>
}