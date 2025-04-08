import { Contact } from "@prisma/client";
import { ContactsRepository } from "repositories/contacts-repository";

interface FetchContactsPerProfessionRequest {
  profession: string;
  page: number;
}


interface ContactWithCultivations extends Contact {
  cultivations: { cultivation: { name: string } }[];
}


export class FetchContactsPerProfessionUseCase {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({
    profession: query,
    page,
  }: FetchContactsPerProfessionRequest): Promise<{
    contacts: ContactWithCultivations[];
    totalCount: number;
  }> {
    const [contacts, totalCount] = await Promise.all([
      this.contactsRepository.findByProfessionPaginated(query, page),
      this.contactsRepository.countByProfession(query),
    ]);

    return {
      contacts,
      totalCount,
    };
  }
}
