import { PrismaContactsRepository } from "repositories/prisma/prisma-contacts-repository";
import { ExportContactsToExcelUseCase } from "use-cases/export-contacts-to-excel";

export function makeExportContactsToExcelUseCase() {
  const contactsRepository = new PrismaContactsRepository();
  const useCase = new ExportContactsToExcelUseCase(contactsRepository);

  return useCase;
}
