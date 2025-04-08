import { Request, Response } from "express";
import { makeExportContactsToExcelUseCase } from "use-cases/factories/make-export-contacts-to-excel-use-case";

export async function exportToExcel(request: Request, response: Response) {
  
  const { filter, query } = request.query;

  if (!filter || !query) {
    return response.status(400).json({ message: "Parâmetros inválidos." });
  }
  try {
    const exportContactsToExcelUseCase = makeExportContactsToExcelUseCase();
    const excelBuffer = await exportContactsToExcelUseCase.execute({
      filter: filter as string,
      query: query as string,
    });
    response.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=contacts.xlsx"
    );
    return response.send(excelBuffer);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({ message: error.message });
    }
    return response
      .status(500)
      .json({ message: "An unexpected error occurred." });
  }
}
