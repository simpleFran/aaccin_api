import { Request, Response } from "express";
import { z } from "zod";
import { makeCreateCultivationUseCase } from "../../../use-cases/factories/make-create-cultivation-use-case";
import { Prisma } from "@prisma/client";

export async function create(
  request: Request,
  response: Response
): Promise<Response> {
  const createCultivationSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
  });

  try {
    const { name, description } = createCultivationSchema.parse(request.body);
    const createCultivationUseCase = makeCreateCultivationUseCase();

    await createCultivationUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    return response.status(500).json({ message: "Erro interno do servidor" });
  }
}
