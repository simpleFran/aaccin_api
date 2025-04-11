import { Request, Response } from "express";
import { makeFetchPerProfessionUseCase } from "use-cases/factories/make-fetch-per-profession-use-case";

export async function fetchPerProfession(request: Request, response: Response) {
  const { searchTerm, page } = request.query;
  if (!searchTerm) {
    return response.status(400).json({ message: "Profession is required." });
  }

  const pageNumber = page ? Number(page) : 1;

  if (isNaN(pageNumber) || pageNumber < 1) {
    return response.status(400).json({
      message: "Número inválido.",
    });
  }
  try {
    const fetchContactsPerProfessionUseCase = makeFetchPerProfessionUseCase();
    const { contacts, totalCount } =
      await fetchContactsPerProfessionUseCase.execute({
        profession: searchTerm as string,
        page: pageNumber,
      });

    return response.status(200).json({
      contacts,
      totalCount,
      currentPage: pageNumber,
      perPage: 20,
    });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }
    return response.status(500).json({ message: "Internal Server Error." });
  }
}
