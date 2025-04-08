

import { Request,Response } from "express";
import { makeFetchContactDetailsUseCase } from "use-cases/factories/make-fetch-contact-details-use-case";


export async function contactDetails(request: Request, response: Response) {
  const { id } = request.params;

  try {
    const fetchContactDetails = makeFetchContactDetailsUseCase();
    const contactDetails = await fetchContactDetails.execute(id);

    return response.status(200).json(contactDetails);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }
    return response.status(500).json({ message: "Internal Server Error." });
  }
}