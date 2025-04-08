import { Request, Response } from "express";
import { makeFetchPerCultivationUseCase } from "use-cases/factories/make-fetch-per-cultivation";

export async function fetchPerCultivation(request: Request, response: Response) {
  const {cultivationId} = request.params as {cultivationId: string}
  const page = request.query.page ? Number(request.query.page) :1;

  if (!cultivationId) {
    return response
      .status(400)
      .json({ message: "O ID de uma cultura é requerido." });
  }

  try {
    
    const fetchContactsPerCultivationUseCase = makeFetchPerCultivationUseCase();
    const contacts = await fetchContactsPerCultivationUseCase.execute({cultivationId,page});


    return response.status(200).json(contacts);

  } catch (error) {
    if (error instanceof Error){
      return response.status(400).json({message:error.message})
    }
    return response.status(500).json({message:"Internal Server Error."})
  }
}
