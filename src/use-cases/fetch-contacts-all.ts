import { Contact } from "@prisma/client";
import { ContactsRepository } from "repositories/contacts-repository";

interface ContactWithCultivations extends Contact {
  cultivations: { cultivation: { name: string } }[];
}

export class FetchContactsAllUseCase {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute(page: number): Promise<{
    contacts: ContactWithCultivations[];
    totalCount: number;
  }> {
  const contacts = await this.contactsRepository.findAllContacts(page);
  const totalCount = await this.contactsRepository.countAllContacts();

   if (contacts.length === 0) {
     throw new Error("Nenhum contato encontrado.");
   }

    return {contacts,totalCount};
  }
}
