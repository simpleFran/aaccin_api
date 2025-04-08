import { Request, Response } from "express";

import { z } from "zod";
import { makeCreateContactUseCase } from "../../../use-cases/factories/make-create-contact-use-case";
import { CreateContactUseCase } from "use-cases/create-contact";

export async function create(request: Request, response: Response): Promise<Response> {
  const createContactSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    profession: z.string(),
    city: z.string(),
    state: z.string(),
    phone: z.string(),
    internal_contact:z.string(),
    cultivationIds: z.array(z.string().uuid()),
  });

  try {
    const { name, email, profession, city,internal_contact,phone, state, cultivationIds } =
      createContactSchema.parse(request.body);

    const createContactUseCase: CreateContactUseCase =
      makeCreateContactUseCase();
    const contact = await createContactUseCase.execute({
      name,
      email,
      profession,
      city,
      state,
      phone,
      internal_contact,
      cultivationIds,
    });
    return response.status(201).json(contact);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message:error.message
      });
    }
    return response.status(500).json({ message: "Erro interno do servidor" });
  }
}
