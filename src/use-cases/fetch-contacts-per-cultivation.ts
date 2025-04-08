import { Contact } from "@prisma/client";
import { ContactsRepository, PaginatedContacts } from "repositories/contacts-repository";

interface FetchContactPerCultivationRequest {
  cultivationId: string;
  page:number;

}

export class FetchContactPerCultivationUseCase {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute({
    cultivationId,page
  }: FetchContactPerCultivationRequest): Promise<PaginatedContacts>{
    
    const contacts = await this.contactsRepository.findByCultivationId(cultivationId,page);

    return contacts;
  }
}
