import { ContactsRepository } from "repositories/contacts-repository";
import ExcelJS from 'exceljs'
import { Contact, Cultivation } from "@prisma/client";

interface ExportContactsToExcelRequest{
    filter:string;
    query:string;
}
interface ContactWithCultivations extends Contact {
  cultivations: { cultivation: { name: string } }[];
}
export class ExportContactsToExcelUseCase{
    constructor(private contactsRepository: ContactsRepository){}

    async execute({filter,query}: ExportContactsToExcelRequest): Promise<Buffer>{
      const contacts = await this.contactsRepository.exportContactsToExcel(
        filter,
        query,
        1
      ) as ContactWithCultivations[]


      if (contacts.length === 0) {
        throw new Error("Nenhum contato encontrado.");
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Contatos");

      worksheet.columns = [
        { header: "Nome", key: "name", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Profissão", key: "profession", width: 30 },
        { header: "Cidade", key: "city", width: 30 },
        { header: "Estado", key: "state", width: 30 },
        { header: "Cultivos", key: "cultivation", width: 30 },
      ];

    //   contacts.forEach((contact)=>worksheet.addRow(contact))
      contacts.forEach((contact) => {
        worksheet.addRow({
          name: contact.name,
          email: contact.email,
          profession: contact.profession,
          city: contact.city,
          state: contact.state,

          cultivation: contact.cultivations
            .map((c) => c.cultivation.name)
            .join(", "), // Adiciona os cultivos como string separada por vírgula
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      return buffer as Buffer;
    }
}