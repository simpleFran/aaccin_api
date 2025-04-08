import { Request, Response } from "express";
import { makeFetchAllContactsUseCase } from "use-cases/factories/make-fetch-all-contacts-use-case";

export async function fetchAll(request: Request, response: Response) {
  const { page } = request.query;

  const pageNumber = page ? Number(page) : 1;
  if (isNaN(pageNumber) || pageNumber < 1) {
    return response.status(400).json({
      message: "Número inválido.",
    });
  }

  try {
    const fetchContactsAll = makeFetchAllContactsUseCase();
    const { contacts, totalCount } = await fetchContactsAll.execute(pageNumber);
    console.log("chegando na controller?")
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
