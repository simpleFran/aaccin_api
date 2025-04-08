import { Prisma, Cultivation } from "@prisma/client";
import { CultivationsRepository } from "../cultivations-repository";
import { prisma } from "../../lib/prisma";

export class PrismaCultivationsRepository implements CultivationsRepository {
  async findAllCultivations(): Promise<Cultivation[]> {
    const allCultivations = await prisma.cultivation.findMany()

    return allCultivations;
  }
  
  async findByName(name: string): Promise<Cultivation | null> {
    const cultivation = await prisma.cultivation.findFirst({
      where: {
        name: name,
      },
    });
    return cultivation;
  }

  async create(
    data: Prisma.CultivationCreateInput
  ): Promise<Cultivation | { error: string }> {
    try {
      const cultivation = await prisma.cultivation.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });

      return cultivation;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.error("❌ Erro: Já existe uma cultura com esse nome");
          throw new Error("Já existe uma cultura com esse nome.");
        }
      }
      throw new Error("Erro ao criar a cultura.");
    }
  }
}
